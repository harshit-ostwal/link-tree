class ProfileDto {
  constructor(profile) {
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.avatar = profile.avatar;
    this.banner = profile.banner;
    this.bio = profile.bio;
    this.userId = profile.userId;
  }
}

export { ProfileDto };
