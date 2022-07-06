enum ErrorForUser {
  NOT_FOUND = 'The requested user does not exists',
  NOTHING_TO_DELETE = 'There is no user to be deleted'
}

enum MessageForUser {
  ALL_USERS_DELETED = 'All the users were deleted successfully',
  USER_DELETED = 'The requested user was successfully deleted'
}

enum UserCredentialsError {
  CREDENTIALS_NOT_SENT = 'There is no email or password',
  EMAIL_MISSING = 'There is no email',
  PASSWORD_MISSING = 'There is no password',
  WRONG_CREDENTIALS = 'The email or password is wrong'
}

export { ErrorForUser as EFU, MessageForUser as MFU, UserCredentialsError as UCE }
