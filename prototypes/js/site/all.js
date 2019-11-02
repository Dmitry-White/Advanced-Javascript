(() => {
  const html = document.documentElement;
  const $html = $(html);
  const current = 'current';
  const close = 'close';
  const open = 'open';
  const hidden = 'hidden';
  const selected = 'selected';
  const jsNone = 'js_none';
  const ariaHidden = 'aria-hidden';
  const ariaInvalid = 'aria-invalid';
  const ariaDescribedBy = 'aria-describedby';
  let multiplier;

  let $summaryItems;
  let summaryTotal = 0;
  let $grandTotal;
  let grandTotal;
  let $subTotal;
  let $shippingTotal;
  let $shippingOptions;
  let shippingCost;
  let subTotalCost;
  let $checkoutForm;

  const $miniQty = $('#mini_qty');
  const $miniTotal = $('#mini_total');
  const $basketDrawer = $('#basket_drawer');
  const $drawerClose = $('#drawer_close');
  const $drawerSubTotal = $('#drawer_sub_total');
  const $drawerShippingTotal = $('#drawer_shipping_total');
  const $drawerGrandTotal = $('#drawer_grand_total');
  const $basketSubTotal = $('#basket_sub_total');
  const $basketShippingTotal = $('#basket_shipping_total');
  const $basketGrandTotal = $('#basket_grand_total');
  const $miniBasket = $('a.basket');

  const placeholder = {
    init() {
      const pl = 'placeholder';
      if (!Modernizr.input.placeholder) {
        const $placeholder = $(`[${pl}]`);
        $placeholder
          .focus(function () {
            const input = $(this);
            if (input.val() == input.attr(pl)) input.val('').removeClass(pl);
          })
          .blur(function () {
            const input = $(this);
            if (input.val() == '' || input.val() == input.attr(pl)) input.addClass(pl).val(input.attr(pl));
          })
          .blur();

        $placeholder.parents('form').on('submit', function () {
          $(this).find(`[${pl}]`).each(function () {
            const $input = $(this);
            if ($input.val() == $input.attr(pl)) $input.val('');
          });
        });
      }
      $html.addClass(pl);
    },
  };

  const slider = {
    init() {
      const $sliderParent = $('.feature_slider');

      if ($sliderParent.length) {
        $sliderParent.each(function (index) {
          const $this = $(this);
          const $slides = $this.find('li');
          const slidesCount = $slides.length;

          if (slidesCount > 1) {
            const li = '';
            let interval = false;
            let nav = true;
            let pager = true;

            if (!supports.touch && parseInt($this.data('interval'))) interval = parseInt($this.data('interval') * 1000);

            if ($this.data('nav') === false) {
              nav = false;
            } else {
              var $navPrev = $('<a href="#previous" class="nav prev"><span>Previous</span></a>');
              var $navNext = $('<a href="#next" class="nav next"><span>Next</span></a>');
            }

            if ($this.data('pager') === false) pager = false;
            else var $navPager = $('<ul class="nav_pager reset menu" />');

            if (nav) $this.append($navPrev).append($navNext);

            if (pager) $this.append($navPager);

            $this.addClass('multiple');

            if (Modernizr.csstransforms && !(layoutEngine.vendor === 'ie' && layoutEngine.version === 9)) {
              if (pager) {
                for (let i = 1; i <= slidesCount; i++) {
                  li += `<li><a href="#slide-${i}">Slide ${i}</a></li>`;
                }

                $navPager.append(li);
                var $navPagerLi = $navPager.find('li');
                var $navPagerA = $navPager.find('a');
              }

              const $feature = $this.find('.inner');
              const slider = new Swipe($feature[0], {
                callback: (e, pos) => {
                  $slides.attr(ariaHidden, true);
                  $slides.filter(`:eq(${pos})`).attr(ariaHidden, false);

                  if (pager) {
                    $navPagerLi.removeClass(current);
                    $navPagerLi.filter(`:eq(${pos})`).addClass(current);
                  }

                  if (!interval) trackEvent('Website', 'Carousel', `Slide ${pos + 1}`);
                },
              });

              $slides.filter(':not(:first-child)').attr(ariaHidden, true);

              if (pager) $navPagerLi.filter(':first-child').addClass(current);

              $this.addClass('swipejs');

              if (nav) {
                $navPrev.on('click', (e) => {
                  e.preventDefault();
                  slider.prev();
                  if (interval) {
                    window.clearTimeout(timer);
                    interval = false;
                  }
                });

                $navNext.on('click', (e) => {
                  e.preventDefault();
                  slider.next();
                  if (interval) {
                    window.clearTimeout(timer);
                    interval = false;
                  }
                });
              }

              if (pager) {
                $navPagerA.each(function (idx) {
                  const i = idx;
                  $(this).on('click', function (e) {
                    e.preventDefault();
                    slider.slide(i);
                    $navPagerLi.removeClass(current);
                    $(this).parent().addClass(current);
                    if (interval) {
                      window.clearTimeout(timer);
                      interval = false;
                    }
                  });
                });
              }

              const carousel = () => slider.next();

              if (interval) {
                timer = window.setInterval(carousel, interval);
                const $tileA = $this.find('.tile a');

                $this.find($tileA).hover(
                  (e) => {
                    e.stopPropagation();
                    if (interval) window.clearTimeout(timer);
                  },
                  (e) => {
                    e.stopPropagation();
                    if (interval) timer = window.setInterval(carousel, interval);
                  },
                );
              }
            } else {
              const $feature = $this.find('.slider');
              const w = 'width: 100% !important';
              const cycleOpts = {
                activePagerClass: current,
                cleartypeNoBg: true,
                fx: 'scrollHorz',
                speed: 'fast',
                timeout: interval,
                after: (curr, next, opts) => {
                  const idx = opts.currSlide;
                  $slides.attr(ariaHidden, true);
                  $slides.filter(`:eq(${idx})`).attr(ariaHidden, false);
                },
              };

              if (nav) {
                $navPrev.attr('id', `nav_prev-${index}`);
                $navNext.attr('id', `nav_next-${index}`);
                cycleOpts.prev = `#nav_prev-${index}`;
                cycleOpts.next = `#nav_next-${index}`;
              }

              if (pager) {
                $navPager.attr('id', `nav_pager-${index}`);
                cycleOpts.pager = `#nav_pager-${index}`;
                cycleOpts.pagerAnchorBuilder = (idx, slide) => `<li><a href="#slide-${idx + 1}">Slide ${idx + 1}</a></li>`;
              }

              $feature.attr('style', w);
              $feature.find('li').attr('style', w);

              Modernizr.load({
                load: '/js/vendor/jquery.cycle.all.min.js',
                complete: () => $feature.cycle(cycleOpts),
              });
            }
          }
        });
      }
    },
  };

  const product = {
    gallery() {
      const $galleryLarge = $('#gallery_lg img');
      const $galleryLinks = $('#gallery_thumbs a');

      $galleryLinks.on('click', function (e) {
        e.preventDefault();
        $galleryLinks.removeClass(current);
        const $this = $(this);
        $this.addClass(current);
        $galleryLarge[0].src = $this[0].href.replace('thumb', 'large');
      });
    },
  };

  const checkout = {
    init() {
      $summaryItems = $('.summary_item.checkout');
      if ($summaryItems.length) {
        $summaryItems.each(function () {
          const $this = $(this);
          summaryTotal += (parseInt($this.data('qty')) * parseFloat($this.data('price')));
        });
        summaryTotal = summaryTotal.toFixed(2);

        $grandTotal = $('#grand_total');
        $subTotal = $('#sub_total');
        $shippingTotal = $('#shipping_total');
        $shippingOptions = $('input[name="shipping"]');

        $subTotal.text(`$${summaryTotal}`);
        shippingCost = $shippingOptions.filter(':checked')[0].value;
        checkout.calcTotals();

        $shippingOptions.on('change', function () {
          shippingCost = $(this)[0].value;
          checkout.calcTotals();
        });
      }
      checkout.validate();
    },
    calcTotals() {
      $shippingTotal.text(`$${shippingCost}`);
      grandTotal = parseFloat(shippingCost) + parseFloat(summaryTotal);
      grandTotal = grandTotal.toFixed(2);
      $grandTotal.text(`$${grandTotal}`);
    },
    validate() {
      $checkoutForm = $('#checkout_form');
      $checkoutForm.on('submit', () => {
        $('.error').removeClass(jsNone);
        return false;
      });
    },
  };

  const basket = {
    init() {
      $('.basket_add').on('submit', function (e) {
        e.preventDefault();
        basket.productAdd($(this), $(this).serializeArray());
        return false;
      });

      if (!$.cookie('basket') && !izilla_gup.miniBasket) $('#basket_empty').removeClass(hidden);
      else basket.calculate();

      if (izilla_gup.clearBasket) {
        $.removeCookie('basket');
        $.removeCookie('qty');
        $.removeCookie('shipping');
        $.removeCookie('total');
        let wl = window.location.toString();
        wl = wl.replace('clearBasket=true', '');
        window.location = wl;
      }

      $drawerClose.on('click', (e) => {
        e.preventDefault();
        $basketDrawer.slideUp();
      });

      $miniBasket.hoverIntent({
        timeout: 500,
        over: () => {
          if (!$miniBasket.hasClass('empty')) {
            if ($.cookie('qty')) {
              if (parseInt($.cookie('qty')) === 1) $('.drawer_item').eq(0).removeClass(hidden);
              else $('.drawer_item').removeClass(hidden);

              $basketDrawer.slideDown();
            }
          }
        },
        out: () => { },
      });
    },
    calculate: (post) => {
      const $basketContents = $('#basket_contents');
      const $basketItems = $('.basket_item');
      const query = window.location.search;
      let shipping;
      let total;
      let grandtotal;

      $.cookie('basket', true);

      if (!post) {
        window.qtyVar = query.match(/qty=(\d+)/);
        try {
          window.qtyVar = window.qtyVar[1];
        } catch (e) {
        }
        window.totalVar = query.match(/total=(\d+(?:.?\d+)?)/);
        try {
          window.totalVar = window.totalVar[1];
        } catch (e) {
        }
        window.shippingVar = query.match(/shipping=(\d+(?:.?\d+)?)/);
        try {
          window.shippingVar = window.shippingVar[1];
        } catch (e) {
        }
      }

      if (window.qtyVar) {
        window.qtyVar = parseInt(window.qtyVar);
        $.cookie('qty', window.qtyVar);
      }

      $basketContents.removeClass(hidden);
      for (i = 0; i < $.cookie('qty'); i++) {
        $basketItems.eq(i).removeClass(hidden);
      }

      $miniQty.html($.cookie('qty'));
      $miniBasket.removeClass('empty');

      if (window.shippingVar) window.shippingVar = parseFloat(window.shippingVar);

      $.cookie('shipping', window.shippingVar);
      shipping = $.cookie('shipping');

      if (shipping == 'null' || shipping === 0 || shipping === '0') {
        shipping = 0;
        $basketShippingTotal.html('$ FREE');
        $drawerShippingTotal.html('$ FREE');
      } else {
        $basketShippingTotal.html(`$${Number(shipping).toFixed(2)}`);
        $drawerShippingTotal.html(`$${Number(shipping).toFixed(2)}`);
      }

      if (window.totalVar) {
        window.totalVar = parseFloat(window.totalVar);
        $.cookie('total', window.totalVar);
      }

      total = $.cookie('total');
      grandtotal = Number(total) + Number(shipping);
      $basketSubTotal.html(`$${Number(total).toFixed(2)}`);
      $miniTotal.html(`$${Number(total).toFixed(2)}`);
      $drawerSubTotal.html(`$${Number(total).toFixed(2)}`);
      $basketGrandTotal.html(`$${Number(grandtotal).toFixed(2)}`);
      $drawerGrandTotal.html(`$${Number(grandtotal).toFixed(2)}`);

      if (post) {
        $('#quick_search').ScrollTo({
          duration: 200,
          onlyIfOutside: true,
        });
        $basketDrawer.slideDown();
        if (window.qtyVar === 1) $('.drawer_item').eq(0).removeClass(hidden);
        else $('.drawer_item').removeClass(hidden);
      }
    },
    productAdd: (el, data) => {
      const $this = $(el);
      const dataObject = {};
      let newItem;

      for (let i = 0; i < data.length; i++) {
        dataObject[data[i].name] = data[i].value;
      }
      console.log(dataObject);

      if (dataObject.category === 'arrangement') {
        newItem = new Arrangement(dataObject.itemname, dataObject.vasetype, dataObject.qty);
      } else if (dataObject.category === 'live') {
        newItem = new Live(dataObject.itemname, dataObject.pottype, dataObject.qty);
      } else if (dataObject.category === 'bouquet') {
        if ($.cookie('bouquetCount')) {
          $.cookie('bouquetCount', parseInt($.cookie('bouquetCount')) + 1);
        } else {
          $.cookie('bouquetCount', 1);
        }

        newItem = new Bouquet(dataObject.category, dataObject.vasetype);

        for (item in dataObject) {
          // if item starts with 'qty' and has a value greater than 0
          if (RegExp('qty.+').test(item) && dataObject[item] > 0) {
            const stemType = item.substr(3);
            const legend = $(`#${item}`).parent().parent().data('legend');
            const key = legend.replace(/\s/g, '');
            // if item requires a color selection and one has been specified
            if (['CL', 'GD', 'R', 'L', 'T'].includes(stemType)
              && dataObject[`color${stemType}`] !== '---') {
              // add new item, specifying name, quantity, and color
              newItem.flowers.addStem(key, dataObject[item], dataObject[`color${stemType}`]);
            } else {
              // add new item specifying only name and quantity
              newItem.flowers.addStem(key, dataObject[item]);
            }
          }
        }
      }

      newItem.logItem();

      if ($.cookie('basket-data')) {
        const cookieData = $.cookie('basket-data');
        const cookieArray = JSON.parse(cookieData);
        cookieArray.push(newItem);
        $.cookie('basket-data', JSON.stringify(cookieArray));
      } else {
        const cookieArray = new Array(newItem);
        $.cookie('basket-data', JSON.stringify(cookieArray));
      }
      console.log(JSON.parse($.cookie('basket-data')));

      if ($.cookie('qty')) window.qtyVar = parseInt($.cookie('qty'));
      else window.qtyVar = 0;

      window.qtyVar += parseInt($this.find('input[name="qty"]').val());

      window.shippingVar = parseFloat($this.find('input[name="shipping"]').val());

      if ($.cookie('total')) window.totalVar = parseFloat($.cookie('total'));
      else window.totalVar = 0;

      window.totalVar += (parseInt($this.find('input[name="qty"]').val()) * parseFloat($this.find('input[name="unitprice"]').val()));
      basket.calculate(true);
    },
  };

  const tooltips = {
    init: () => {
      tooltips.lightbox();
      tooltips.question();
    },
    lightbox() {
      const $lightboxLinks = $('.lightbox');
      const $cboxContent = $('#cboxContent');
      const totalLightboxes = $lightboxLinks.length;
      const disabled = 'disabled';
      let currentLightbox = 0;
      let hasrun = false;

      $lightboxLinks.each(function (idx) {
        const $this = $(this);
        $this.on('click', () => {
          currentLightbox = idx + 1;
        });
        $this.colorbox({
          current: '{current} of {total}',
          innerHeight: 405,
          innerWidth: 720,
          loop: false,
          opacity: 0.7,
          onComplete: () => {
            if (!hasrun) {
              $cboxContent.prepend('<span id="cboxPreviousDisabled" /><span id="cboxNextDisabled" /><a href="#previous" id="cboxPreviousLink">Previous</a><a href="#next" id="cboxNextLink">Next</a>');
              hasrun = true;
            }
            $('#cboxPreviousLink, #cboxNextLink').removeClass(disabled);
            if (currentLightbox === 1) $('#cboxPreviousLink').addClass(disabled);
            if (currentLightbox === totalLightboxes) $('#cboxNextLink').addClass(disabled);
          },
          onClosed: () => {
            currentLightbox = 0;
          },
        });
      });

      $('#cboxContent').on('click', '.close_caption', function (e) {
        e.preventDefault();
        $(this).addClass(close);
      });

      $('#cboxContent').on('click', '#cboxPrevious', (e) => {
        currentLightbox--;
        if (currentLightbox < totalLightboxes) $('#cboxPreviousLink, #cboxNextLink').removeClass(disabled);
        if (currentLightbox === 1) $('#cboxPreviousLink').addClass(disabled);
      });

      $('#cboxContent').on('click', '#cboxNext', (e) => {
        currentLightbox++;
        if (currentLightbox > 1) $('#cboxPreviousLink, #cboxNextLink').removeClass(disabled);
        if (currentLightbox === totalLightboxes) $('#cboxNextLink').addClass(disabled);
      });

      $('#cboxContent').on('click', '#cboxPreviousLink', (e) => {
        e.preventDefault();
        $('#cboxPrevious').click();
      });

      $('#cboxContent').on('click', '#cboxNextLink', (e) => {
        e.preventDefault();
        $('#cboxNext').click();
      });
    },
    question: () => $('.question').on('click', (e) => e.preventDefault()),
  };

  const initApp = () => {
    $html.addClass('jquery');

    if (layoutEngine.vendor === 'mozilla' && cssua.ua.desktop === 'windows') Modernizr.load('/js/vendor/jquery.firefox.hwa.min.js');

    if (layoutEngine.vendor === 'webkit' && cssua.ua.ios) $('label').attr('onclick', '');

    placeholder.init();
    slider.init();
    product.gallery();
    checkout.init();
    basket.init();
    tooltips.init();
  };

  function Item() {}
  Item.prototype.type = 'floral';
  Item.prototype.logItem = function () {
    console.log(`%c${this.name}`, 'font-weight: bold');
    for (const prop in this) {
      console.log(' ', prop, ': ', this[prop]);
    }
  };

  function Flower(quantity, color) {
    this[color] = quantity;
  }
  Flower.prototype = new Item();

  function Live(name, pot, quantity = 1) {
    this.name = name;
    this.pot = pot;
    this.quantity = quantity;
  }
  Live.prototype = new Item();
  Live.prototype.storage = 'warm';

  function Cut() {}
  Cut.prototype = new Item();
  Cut.prototype.storage = 'cool';

  function Bouquet(name, vase) {
    this.name = name;
    this.vase = vase;
  }
  Bouquet.prototype = new Cut();
  Bouquet.prototype.flowers = {
    addStem(name, quantity = 1, color = 'Default') {
      this[name] = new Flower(quantity, color);
    },
  };

  function Arrangement(name, vase, quantity = 1) {
    this.name = name;
    this.vase = vase;
    this.quantity = quantity;
  }
  Arrangement.prototype = new Cut();

  $(document).ready(initApp);
})();
