import { Mesh, Program, Texture, Renderer, Transform, Plane } from 'ogl'
import type { OGLRenderingContext } from 'ogl';
import vertex from './shader/vertex.glsl?raw';
import fragment from './shader/fragment.glsl?raw';

type Screen = { width: number; height: number };
type Viewport = { width: number; height: number };

type MediaParams = {
  gl: OGLRenderingContext;
  geometry: Plane;
  scene: Transform;
  renderer: Renderer;
  screen: Screen;
  viewport: Viewport;
  $el: HTMLElement;
  img: HTMLImageElement;
};

export default class Media {
  private gl: OGLRenderingContext;
  private geometry: Plane;
  private scene: Transform;
  private renderer: Renderer;
  private screen: Screen;
  private viewport: Viewport;
  public img: HTMLImageElement;
  public $el: HTMLElement;
  public scroll: number;
  public blurStrength: number;
  private program!: Program;
  private plane!: Mesh;
  private x: number = 0;
  private y: number = 0;

  constructor ({ gl, geometry, scene, renderer, screen, viewport, $el, img }: MediaParams) {
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.renderer = renderer;
    this.screen = screen;
    this.viewport = viewport;
    this.img = img;
    this.$el = $el;
    this.scroll = 0;
    this.blurStrength = 1;
    this.createShader();
    this.createMesh();
    this.onResize();
  }
  private createShader (): void {
    const texture = new Texture(this.gl, {
      generateMipmaps: false
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment,
      vertex,
      uniforms: {
        tMap: { value: texture },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 100 * Math.random() },
        uBlurStrength: { value: this.blurStrength },
      },
      transparent: true
    });
    const image = new window.Image();
    image.src = this.img.src;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      texture.image = image;
      this.program.uniforms.uImageSize.value = [image.naturalWidth, image.naturalHeight];
    };
  }
  private createMesh (): void {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  onScroll (scroll: number): void {
    this.scroll = scroll;
    this.setY(this.y);
  }
  update (): void {
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uBlurStrength.value = this.blurStrength;
  }
  setScale (x?: number | null, y?: number | null): void {
    x = x ?? this.$el.offsetWidth;
    y = y ?? this.$el.offsetHeight;
    this.plane.scale.x = this.viewport.width * x / this.screen.width;
    this.plane.scale.y = this.viewport.height * y / this.screen.height;
    this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
  }
  setX(x: number = 0): void {
    this.x = x;
    this.plane.position.x = -(this.viewport.width / 2) + (this.plane.scale.x / 2) + (this.x / this.screen.width) * this.viewport.width;
  }
  setY(y: number = 0): void {
    this.y = y;
    this.plane.position.y = (this.viewport.height / 2) - (this.plane.scale.y / 2) - ((this.y - this.scroll) / this.screen.height) * this.viewport.height;
  }
  onResize ({ screen, viewport }: { screen?: Screen; viewport?: Viewport } = {}): void {
    if (screen) {
      this.screen = screen;
    }
    if (viewport) {
      this.viewport = viewport;
      this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height];
    }
    this.setScale();
    this.setX(this.$el.offsetLeft);
    this.setY(this.$el.offsetTop);
  }
}