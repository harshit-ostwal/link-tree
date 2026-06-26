Session Management

Sign Out (Current Device)

- Replace session deletion with session revocation using revokedAt
- Revoke only the current session during sign out
- Keep tokenVersion unchanged for single device sign out
- Prevent refresh token usage for revoked sessions

Sign Out All Devices

- Revoke all active sessions for the authenticated user
- Increment user tokenVersion to invalidate all active access tokens
- Ensure all refresh tokens become unusable after revocation
- Return success response indicating all devices have been signed out

Refresh Token Rotation

- Validate session is not revoked before issuing new tokens
- Create a new session during refresh token rotation
- Set replacedBy on the previous session
- Revoke the previous session after successful rotation

Security Improvements

- Add middleware to validate JWT tokenVersion
- Reject access tokens with outdated tokenVersion
- Track session IP address and user agent
- Add endpoint to list active sessions/devices

Session Cleanup

- Create scheduled job to remove revoked sessions older than 90 days
- Create scheduled job to remove expired sessions
- Add database indexes for session lookup and cleanup operations
