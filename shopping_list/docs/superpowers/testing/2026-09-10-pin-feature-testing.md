# List Pin Feature - Integration Testing Guide

## Implementation Summary

**Feature:** Per-user list pinning with server-side persistence

**Database Changes:**
- New table: `shopping_list_user_prefs` (user_id, list_id, is_pinned)
- Migration: Version1006Date20260910000000

**Code Changes:**
- Entity: `UserListPreference` (Db/UserListPreference.php)
- Mapper: `UserListPreferenceMapper` with thread-safe upsert (Db/UserListPreferenceMapper.php)
- ShoppingList entity: Added `isPinned` field (Db/ShoppingList.php)
- Service: Load preferences in `ListService::findAll()` (Service/ListService.php)
- Controller: `PreferencesController` with update endpoint (Controller/PreferencesController.php)
- Route: `PATCH /api/v1/lists/{id}/preferences` (appinfo/routes.php)

**Commits:**
- 842085f: Migration
- f887d77: UserListPreference entity
- 351c1d2: UserListPreferenceMapper (thread-safe)
- e5a0930: ShoppingList entity isPinned field
- 56c0f69: ListService preference loading
- d489133: PreferencesController
- ce14685: Route configuration

## Testing Prerequisites

- Nextcloud instance running (local dev or test environment)
- Shopping List app installed and enabled
- At least 2 test users (for shared list testing)
- Database access for verification queries
- API testing tool (curl, Postman, or similar)

## Test Scenarios

### Scenario 1: Fresh Installation / Migration

**Test:** Database migration runs successfully

**Steps:**
1. Install/update the Shopping List app
2. Check database for `shopping_list_user_prefs` table
3. Verify table structure:
   - Columns: user_id, list_id, is_pinned
   - Primary key: (user_id, list_id)
   - Foreign key: list_id → shopping_list_lists(id) CASCADE
   - Index: user_id

**Expected:**
- Migration runs without errors
- Table exists with correct structure
- Foreign key constraint active

**Verification Query:**
```sql
DESCRIBE shopping_list_user_prefs;
SHOW CREATE TABLE shopping_list_user_prefs;
```

---

### Scenario 2: List Without Preference (Default State)

**Test:** Lists return `isPinned: null` when no preference exists

**Steps:**
1. Create a new list as User A
2. GET /api/v1/lists
3. Check response for the new list

**Expected:**
```json
{
  "id": 123,
  "title": "My List",
  "isPinned": null,
  ...
}
```

**Database Check:**
```sql
SELECT * FROM shopping_list_user_prefs WHERE user_id='userA' AND list_id=123;
```
Expected: Empty result (no row exists)

---

### Scenario 3: Pin a List

**Test:** User can pin a list, preference row created

**Steps:**
1. User A has list with id=123
2. PATCH /api/v1/lists/123/preferences
   Body: `{"isPinned": true}`
3. GET /api/v1/lists
4. Check response

**Expected:**
- PATCH returns 200 OK with preference object
- GET shows `isPinned: true` for list 123
- Other lists still `isPinned: null`

**Database Check:**
```sql
SELECT * FROM shopping_list_user_prefs WHERE user_id='userA' AND list_id=123;
```
Expected: One row with `is_pinned=1`

---

### Scenario 4: Unpin a List

**Test:** User can unpin a pinned list (row updated, not deleted)

**Steps:**
1. User A has list 123 pinned (from Scenario 3)
2. PATCH /api/v1/lists/123/preferences
   Body: `{"isPinned": false}`
3. GET /api/v1/lists

**Expected:**
- PATCH returns 200 OK
- GET shows `isPinned: false` for list 123
- Preference row still exists (updated, not deleted)

**Database Check:**
```sql
SELECT * FROM shopping_list_user_prefs WHERE user_id='userA' AND list_id=123;
```
Expected: One row with `is_pinned=0`

---

### Scenario 5: Shared List - Independent Pin States

**Test:** Two users can independently pin the same shared list

**Steps:**
1. User A owns list 456, shares with User B
2. User A: PATCH /api/v1/lists/456/preferences `{"isPinned": true}`
3. User B: PATCH /api/v1/lists/456/preferences `{"isPinned": true}`
4. User A: GET /api/v1/lists
5. User B: GET /api/v1/lists

**Expected:**
- Both users see `isPinned: true` for list 456
- Two separate preference rows exist in database

**Database Check:**
```sql
SELECT * FROM shopping_list_user_prefs WHERE list_id=456;
```
Expected: Two rows (userA and userB, both is_pinned=1)

**Then:**
6. User A unpins: PATCH with `{"isPinned": false}`
7. User A: GET /api/v1/lists → sees `isPinned: false`
8. User B: GET /api/v1/lists → still sees `isPinned: true`

---

### Scenario 6: List Deletion Cascade

**Test:** Deleting a list removes preference rows automatically

**Steps:**
1. User A creates list 789
2. User A pins it: PATCH /api/v1/lists/789/preferences `{"isPinned": true}`
3. Verify preference row exists
4. User A deletes list 789 (DELETE /api/v1/lists/789)
5. Check database

**Expected:**
- List deletion succeeds
- Preference row automatically deleted (CASCADE)

**Database Check:**
```sql
SELECT * FROM shopping_list_user_prefs WHERE list_id=789;
```
Expected: Empty result

---

### Scenario 7: Permission Denied

**Test:** User cannot pin a list they don't have access to

**Steps:**
1. User A owns private list 111 (not shared)
2. User B attempts: PATCH /api/v1/lists/111/preferences `{"isPinned": true}`

**Expected:**
- PATCH returns 403 Forbidden
- No preference row created

**Database Check:**
```sql
SELECT * FROM shopping_list_user_prefs WHERE user_id='userB' AND list_id=111;
```
Expected: Empty result

---

### Scenario 8: List Not Found

**Test:** Attempting to pin non-existent list returns 404

**Steps:**
1. User A attempts: PATCH /api/v1/lists/99999/preferences `{"isPinned": true}`

**Expected:**
- PATCH returns 404 Not Found

---

### Scenario 9: Concurrent Upsert (Race Condition Test)

**Test:** Multiple concurrent PATCH requests don't cause duplicate key errors

**Steps:**
1. User A has list 555 (no preference)
2. Send 2-3 concurrent PATCH requests:
   - PATCH /api/v1/lists/555/preferences `{"isPinned": true}` (x3 simultaneously)

**Expected:**
- All requests return 200 OK
- Only one preference row exists
- No duplicate key errors
- Final state: is_pinned=1

**Database Check:**
```sql
SELECT COUNT(*) FROM shopping_list_user_prefs WHERE user_id='userA' AND list_id=555;
```
Expected: 1 (exactly one row, no duplicates)

---

## Edge Cases

### Edge Case 1: Toggle Pin Rapidly
- Pin → Unpin → Pin → Unpin in quick succession
- Expected: Final state matches last request, no race conditions

### Edge Case 2: Share After Pinning
- User A pins list, then shares with User B
- Expected: User A keeps pin state, User B sees null (no preference)

### Edge Case 3: Unshare While Pinned
- User B has pinned a shared list, User A unshares it
- Expected: Preference row remains, but list no longer appears in User B's list (permission check in ListService filters it out)

---

## Manual Testing Checklist

- [ ] Migration runs successfully on fresh install
- [ ] New lists show `isPinned: null`
- [ ] Can pin a list (returns true)
- [ ] Can unpin a list (returns false, row persists)
- [ ] Shared list: User A and User B can independently pin
- [ ] Shared list: User A unpinning doesn't affect User B's pin state
- [ ] Deleting a list cascades to preferences table
- [ ] Cannot pin a list without access (403)
- [ ] Cannot pin non-existent list (404)
- [ ] Concurrent upserts don't create duplicates
- [ ] Toggle pin rapidly works correctly
- [ ] Share/unshare doesn't break pin states

---

## Automated Testing (Future Work)

This feature was implemented without automated tests due to the Nextcloud environment complexity. Future work should include:

1. **Unit Tests:**
   - UserListPreferenceMapper::upsert() race condition handling
   - ListService::findAll() preference loading logic

2. **Integration Tests:**
   - PreferencesController endpoint responses
   - Permission checks (403/404)
   - Database CASCADE behavior

3. **End-to-End Tests:**
   - Full pin/unpin workflows
   - Multi-user scenarios
   - Share/unshare interactions
