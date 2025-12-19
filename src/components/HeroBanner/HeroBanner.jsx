function HeroBanner() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="hero-image bg-light rounded-3 w-100" />
          <img
            src="https://media.gq.com.tw/photos/5dbc59242551d400086a1ff4/master/w_1600%2Cc_limit/2017122845249581.jpg"
            alt="Logo"
            width="100%"
            height="100%"
            className="d-block mx-auto mt-3"
          />
        </div>

        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="fw-bold mb-3">New Balance 574</h1>
          <p className="text-muted mb-4">
            An incredible classic from New Balance! The 574 trainers combine stylish design with comfort and quality. Perfect for everyday wear and an active lifestyle.
          </p>
          <p className="text-muted mb-4"> 
            Discover discounts of up to 30% on selected models! Do not miss the opportunity to update your wardrobe with stylish trainers at an affordable price.
          </p>
          <p className="mb-4">
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
