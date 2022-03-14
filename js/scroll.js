


const lerp = (a, b, n) => (1 - n) * a + n * b



export default class Scroll{
    constructor(){
        this.DOM = { main: document.querySelector("main") };
        // the scrollable element
        // we translate this element when scrolling (y-axis)
        this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll]");
        this.docScroll = 0;
        this.scrollToRender = 0;
        this.current = 0;
        this.ease = 0.1;
        this.speed = 0;
        this.speedTarget = 0;

        // set the body's height
        this.setSize();
        // set the initial values
        this.getScroll();
        this.init();
        // the <main> element's style needs to be modified
        this.style();
        // init/bind events
        this.initEvents();
        // start the render loop
        requestAnimationFrame(() => this.render());
    }

    init(){
        // sets the initial value (no interpolation) - translate the scroll value
        for (const key in this.renderedStyles) {
        this.current = this.scrollToRender = this.getScroll();
        }
        // translate the scrollable element
        this.setPosition();
        this.shouldRender = true;
    }

    style(){
        this.DOM.main.style.position = "fixed";
        this.DOM.main.style.width = this.DOM.main.style.height = "100%";
        this.DOM.main.style.top = this.DOM.main.style.left = 0;
        this.DOM.main.style.overflow = "hidden";
    }

    getScroll(){
        this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
        return this.docScroll;
    }
    initEvents() {

        window.onbeforeunload = function() {
            window.scrollTo(0, 0);
        };
        // on resize reset the body's height
        window.addEventListener("resize", () => this.setSize());
        window.addEventListener("scroll", this.getScroll.bind(this));

    }

    setSize() {
      // set the heigh of the body in order to keep the scrollbar on the page
      document.body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
    }


    setPosition() {
      // translates the scrollable element
      if (
        Math.round(this.scrollToRender) !==
          Math.round(this.current) ||
        this.scrollToRender < 10
      ) {
        this.DOM.scrollable.style.transform = `translate3d(0,${-1 *
          this.scrollToRender}px,0)`;
      }

    }

    render() {
        this.speed = Math.min(Math.abs(this.current - this.scrollToRender), 200)/200;
        this.speedTarget +=(this.speed - this.speedTarget)*0.2
        
        this.current = this.getScroll();
        this.scrollToRender = lerp(
          this.scrollToRender,
          this.current,
          this.ease
        );

      // and translate the scrollable element
      this.setPosition();
    }
}