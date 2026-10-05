/**
 * The message an OCS 400 carries, such as the hint from the server's
 * password policy, worth showing as it is. Null for any other failure,
 * where a general message reads better.
 */
export function badRequestMessage(error: unknown): string | null {
	const response = (error as { response?: { status?: number, data?: { ocs?: { data?: { message?: unknown } } } } } | undefined)?.response
	const message = response?.data?.ocs?.data?.message
	return response?.status === 400 && typeof message === 'string' && message !== '' ? message : null
}
