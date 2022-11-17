class URLBuilder {
  private base: string;

  constructor(base: string) {
    const baseURL = base
      .split('/')
      .filter((part) => !!part)
      .join('/');
    this.base = `/${baseURL}`;
  }

  url(slug: string): string {
    return `${this.base}/${slug}`;
  }

  urlRoot(): string {
    return this.base;
  }

  urlRouter(): string {
    return `${this.base}/*`;
  }
}

export default URLBuilder;
