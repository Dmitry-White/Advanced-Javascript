(() => {
  const html = document.documentElement;
  const $html = $(html);
  const current = 'current';
  const close = 'close';
  const open = 'open';
  const selected = 'selected';
  const jsNone = 'js_none';
  const ariaHidden = 'aria-hidden';
  const ariaInvalid = 'aria-invalid';
  const ariaDescribedBy = 'aria-describedby';
  let multiplier;

  const accordion = {
    init() {
      const $accordionLinks = $('.accordion > li > a');

      $accordionLinks.on('click', function (e) {
        e.preventDefault();
        $accordionLinks.removeClass(open);
        $(this).addClass(open);
      });
    },
  };

  const bab = {
    init() {
      const query = window.location.search.substring(1);
      const params = query.split('&');
      const $totalFlowers = $('#total_flowers');
      const $qtys = $('.bab_item').find('input[type="number"]');
      let totalFlowers = 0;

      for (const i in params) {
        const keyValue = params[i].split('=');
        keyValue[0].value = keyValue[1];
      }

      $qtys.each(function (i) {
        totalFlowers += parseInt($(this)[0].value);
      });

      $totalFlowers.html(totalFlowers);
      // $('#total_cost').html('$' + Number(parseFloat($('input[name="unitprice"]')[0].value)).toFixed(2));
    },
  };

  const initApp = () => {
    accordion.init();
    bab.init();
  };

  $(document).ready(initApp);
})();
