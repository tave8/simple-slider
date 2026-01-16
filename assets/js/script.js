class Slider {
  constructor({ targetSelector }) {
    // valid css selector of the element that
    // we're turning into a slider
    this.targetSelector = targetSelector;

    if (document.readyState == "complete") {
      this.init();
    } else {
      window.addEventListener("load", this.init.bind(this));
    }
  }

  init() {
    this.addButtons();
    this.showOrHideButtons();
    this.addButtonsShowHideHandler();
    this.positionButtons();
  }

  addButtons = () => {
    const buttons = this.createButtons();
    this.getScroller().prepend(buttons);
  };

  // if user is on desktop, immediately hide the
  // netflix scroller buttons
  showOrHideButtons = () => {
    if (!this.isDesktopDevice()) {
      return;
    }
    //   user device is desktop
    const scroller = this.getScroller();
    // FIX: when adding this class first, buttons do not seem
    // to be correctly positioned
    const buttons = scroller.querySelector(".buttons");
    // buttons.classList.add("buttons-hidden");
  };

  addButtonsShowHideHandler = () => {
    // add on hover listener only if the user device is desktop
    // why? mobile does not have hover/mouseenter
    if (!this.isDesktopDevice()) {
      return;
    }
    //   user device is desktop
    const scroller = this.getScroller();
    // user enters mouse: show scroller buttons
    scroller.addEventListener("mouseenter", () => {
      // the buttons inside this scroller
      const buttons = scroller.querySelector(".buttons");
      buttons.classList.remove("buttons-hidden");
    });

    // user leaves mouse: hide scroller buttons
    scroller.addEventListener("mouseleave", () => {
      // the buttons inside this scroller
      const buttons = scroller.querySelector(".buttons");
      buttons.classList.add("buttons-hidden");
    });
  };

  positionButtons = () => {
    // get netflix scoller
    const scroller = this.getScroller();

    // get the buttons inside the scroller
    const buttons = scroller.querySelector(".buttons");
    const cards = scroller.querySelector(".cards");

    const leftButton = buttons.querySelector(".left");
    const rightButton = buttons.querySelector(".right");

    // left buttons
    leftButton.style.top = this.getAppropriateButtonHeight(cards, leftButton);
    // right button
    rightButton.style.top = this.getAppropriateButtonHeight(cards, rightButton);
    rightButton.style.right = 0;

    // add event listeners to move back and forth horizontally (x-axis)
    // in the cards container
    this.addButtonHandler(leftButton, "left", cards);
    this.addButtonHandler(rightButton, "right", cards);
  };

  addButtonHandler = (button, buttonDirection, cards) => {
    //   left button
    if (buttonDirection == "left") {
      button.addEventListener("click", () => {
        cards.scrollTo({
          left: this.getTotalLeftScrollForLeft(cards),
          behavior: "smooth",
        });
      });
    }
    //   right button
    else if (buttonDirection == "right") {
      button.addEventListener("click", () => {
        cards.scrollTo({
          left: this.getTotalLeftScrollForRight(cards),
          behavior: "smooth",
        });
      });
    }
  };

  getAppropriateButtonHeight = (cardsContainer, button) => {
    const cardsContainerHeight = cardsContainer.offsetHeight;
    const buttonHeight = button.offsetHeight;
    const result = cardsContainerHeight / 2 - buttonHeight / 2;
    return `${result}px`;
  };

  // HELPERS

  // get the html element that this instance attaches to
  getScroller() {
    return document.querySelector(this.targetSelector);
  }

  getMoveLeftByFixedAmount = () => {
    return 300;
  };

  getTotalLeftScrollForLeft = (cards) => {
    const currentLeftScroll = cards.scrollLeft;
    return currentLeftScroll - this.getMoveLeftByFixedAmount();
  };

  getTotalLeftScrollForRight = (cards) => {
    const currentLeftScroll = cards.scrollLeft;
    return currentLeftScroll + this.getMoveLeftByFixedAmount();
  };

  createButtons = () => {
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const leftButton = document.createElement("div");
    const rightButton = document.createElement("div");

    leftButton.classList.add("left");
    rightButton.classList.add("right");

    leftButton.textContent = "<";
    rightButton.textContent = ">";

    buttons.append(leftButton);
    buttons.append(rightButton);

    return buttons;
  };

  addCard() {}

  removeCard() {}

  isDesktopDevice = () => {
    // 1. Modern API (Chromium-based browsers)
    if (navigator.userAgentData) {
      return !navigator.userAgentData.mobile;
    }

    // 2. Legacy Fallback (Safari, Firefox, etc.)
    // We check for common mobile identifiers; if none match, we assume Desktop
    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return !mobileRegex.test(navigator.userAgent);
  };
}

new Slider({
  targetSelector: "#slider1",
});
