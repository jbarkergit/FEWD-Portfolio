export const regex = {
  /** First name, Last name
   * [a-zA-Z-']{1,}$: Followed by one or more letters, hyphens, or apostrophes.
   * Can include hyphens and apostrophes.
   */
  firstName: /[a-zA-Z-']{1,}$/,
  lastName: /[a-zA-Z-']{1,}$/,
  /** Email address
   * RFC 5322
   * (?i): Case-insensitive matching.
   * (?=.{1,256}): Ensure total length is up to 256 characters.
   * (?=.{1,64}@): Ensure the local part is up to 64 characters.
   * [a-z0-9._%+-]+: Local part of the email address.
   * @[a-z0-9.-]+: Domain part of the email address.
   * \.[a-z]{2,}$: Top-level domain with at least two letters.
   */
  emailAddress: /^(?=.{1,256}$)(?=.{1,64}@)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
  /** Password, Password confirmation
   * (?=.*[A-Za-z]): At least one letter.
   * (?=.*\d): At least one digit.
   * (?=.*[@$!%*?&]): At least one special character.
   * [A-Za-z\d@$!%*?&]{8,}$: At least 8 characters long.
   */
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};
