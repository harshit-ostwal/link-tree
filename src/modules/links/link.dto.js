class LinkDto {
  constructor(link) {
    this.id = link.id;

    this.title = link.title;
    this.description = link.description;

    this.url = link.url;
    this.color = link.color;

    this.thumbnail = link.thumbnail;
    this.logo = link.logo;

    this.position = link.position;

    this.isActive = link.isActive;
    this.isVisible = link.isVisible;
    this.isFeatured = link.isFeatured;
  }
}

export default LinkDto;
