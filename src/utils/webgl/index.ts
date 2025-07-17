import Lenis from 'lenis';
import type LenisType from 'lenis';
import GL from './GL.ts';

export default class Index {
    private lenis: LenisType;
    private gl: GL;
    constructor() {
        this.lenis = new Lenis();
        this.lenis.on('scroll', (e: LenisType) => {
            // 这里e类型为Lenis实例
        })
        const raf = (time: number) => {
            this.lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        this.gl = new GL();
        this.lenis.on('scroll', (e: LenisType) => {
            this.gl.onScroll({ scroll: e.scroll })
        })
        // const items = document.querySelectorAll<HTMLLIElement>('#formMap div');
        // const observer = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             entry.target.classList.add('is-visible');
        //             observer.unobserve(entry.target);
        //         }
        //     });
        // });
        // items.forEach(item => {
        //     observer.observe(item);
        // });
    }
}
// window.addEventListener('load', () => {
//     new Index();
// });