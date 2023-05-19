// JSON containing person data, ready for XML conversion
const PRODUCT_DATA_XML = {
  li: [
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/vitamin-a.jpg',
        '@alt': 'Vitamin A - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Vitamin A',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/vitamin-bcomplex.jpg',
        '@alt': 'B Complex - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'B Complex',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/mineralwater-blueberry.jpg',
        '@alt': 'Blueberry Mineral Water - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Blueberry Mineral Water',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/vitamin-c.jpg',
        '@alt': 'Vitamin C - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Vitamin C',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/proteinbar-chocolate.jpg',
        '@alt': 'Protein Bar Chocolate - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Chocolate Protein Bar',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/vitamin-calcium.jpg',
        '@alt': 'Vitamin Calcium - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Calcium Vitamin',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/vitamin-d.jpg',
        '@alt': 'Vitamin D - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Vitamin D',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/vitamin-flaxseed-oil.jpg',
        '@alt': 'Flaxseed Oil - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Flaxseed Oil Vitamin',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/vitamin-iron.jpg',
        '@alt': 'Vitamin Iron - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Iron Vitamin',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/mineralwater-lemonlime.jpg',
        '@alt': 'Mineral Water Lemon Lime - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Lemon Lime Mineral Water',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/vitamin-magnesium.jpg',
        '@alt': 'Vitamin Magnesium - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Magnesium Vitamin',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/vitamin-multi.jpg',
        '@alt': 'Vitamin Multivitamin - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Multi-vitamin',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/proteinbar-peanutbutter.jpg',
        '@alt': 'Vitamin Protein Bar Peanut Butter - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Peanut Butter Protein Bar',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/mineralwater-strawberry.jpg',
        '@alt': 'Mineral Water Strawberry - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Strawberry Mineral Water',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/proteinbar-lemon.jpg',
        '@alt': 'Protein Bar Lemon - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Lemon Protein Bar',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/mineralwater-orange.jpg',
        '@alt': 'Mineral Water Orange - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Orange Mineral Water',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/mineralwater-peach.jpg',
        '@alt': 'Mineral Water Peach - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Peach Mineral Water',
      },
    },
    {
      '@class': 'product-item',
      img: {
        '@class': 'product-image',
        '@src': 'images/products/mineralwater-raspberry.jpg',
        '@alt': 'Mineral Water Raspberry - Product Photo',
      },
      h2: {
        '@class': 'product-name',
        '#text': 'Raspberry Mineral Water',
      },
    },
  ],
};

const PERSON_DATA_XML =
  '<people><div class="person-card"><img src="images/employees/HenryTwill.jpg" alt="HenryTwill Photo" /><div class="card-info"><h3 class="card-name">Henry Twill, Jr</h3><h4 class="card-title">CEO</h4></div><p class="card-text">Henry Twill Jr. is the <em>founder</em> and CEO of H+ Sports. Previously he was an <em>athletic trainer</em> working with several top athletes, making sure that they had the direction and proper coaching to keep them at the <em>top of their game</em>. Henry’s passion for finding natural alternatives led him to developing H+ Sport Multivitamins. The supplements <em>became a success</em> with his clients and led to the creation of H+ Sports.</p></div><div class="person-card"><img src="images/employees/JessicaNewton.jpg" alt="JessicaNewton Photo" /><div class="card-info"><h3 class="card-name">Jessica Newton-Smith, MBA</h3><h4 class="card-title">CFO</h4></div><p class="card-text">Jessica Newton-Smith joined us in 2012 and brings more than <em>10 years</em> of financial management experience to H+ Sports, spanning a variety of companies and industries ranging from <em>Fortune 500 agencies</em> to start-ups. She has extensive experience working in <em>emerging markets</em> and in the consumer and retail sectors.</p></div><div class="person-card"><img src="images/employees/PhiTang.jpg" alt="PhiTang Photo" /><div class="card-info"><h3 class="card-name">Phi Tang, MBA</h3><h4 class="card-title">Director of Product Development</h4></div><p class="card-text">Phi Tang joined H+ Sports in <em>2007</em> as Manager of Marketing Research. He was promoted to Director of Product Development in 2011. He has made <em>major contributions</em> to the discovery, development, and implementation of the H+ Sport product lines. Before joining the company he worked as a <em>scientific expert</em> and brings vast knowledge of ingredients and <em>new technologies</em>.</p></div><div class="person-card"><img src="images/employees/MariaSontas.jpg" alt="MariaSontas Photo" /><div class="card-info"><h3 class="card-name">Maria Sontas</h3><h4 class="card-title">Director of Marketing</h4></div><p class="card-text">Maria Sontas has been with H+ Sport since 2010. She oversees the company’s <em>marketing strategy</em> – ensuring advertising campaigns, social media initiatives, and events are planned to <em>position the company</em> strongly in a competitive marketplace. Maria is a <em>competing triathlete</em> and her passion for our products shows in her unique ability to drive awareness and <em>increase our presence</em> around the world.</p></div><div class="person-card"><img src="images/employees/AngelaHaston.jpg" alt="AngelaHaston Photo" /><div class="card-info"><h3 class="card-name">Angela Hashton</h3><h4 class="card-title">Director of Sales</h4></div><p class="card-text">Angela Hashton joined the company in 2009, to <em>initiate new relationships</em> for our growing line of H+ Sports active apparel. After being with the company for a year, she was promoted to Director of Sales. Angela is the drive behind the H+ Sport <em>ACTIVE product line</em> and has an uncanny ability to formulate strategies that have helped build our unified sales force. <em>Educating people</em> about health and nutrition is something that Angela holds dear.</p></div><div class="person-card"><img src="images/employees/MichaelLewiston.jpg" alt="MichaelLewiston Photo" /><div class="card-info"><h3 class="card-name">Michael Lewiston</h3><h4 class="card-title">MFA, Creative Director</h4></div><p class="card-text">Michael Lewiston is a multi-faceted <em>creative person</em> who began his career as a designer for a small business firm, while also working as an independent <em>painter and sculptor</em>. In 2007, Henry Twill was impressed by Michael’s creative work in a national ad campaign for a high profile sports apparel company. Henry approached Michael, and asked him to <em>manage creative direction</em> for the H+ Sport ACTIVE apparel line.</p></div></people>';
