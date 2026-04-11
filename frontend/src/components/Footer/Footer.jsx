function Footer() {
  return (
    <footer className="bg-light border-top mt-auto py-4">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="fw-bold mb-1">Branding stuff</h6>
            <p className="text-muted small mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Nunc maximus, nulla ut commodo.
            </p>
          </div>

          <div className="col-md-4 mb-3 mb-md-0 text-center">
            <img
              src="https://www.svgrepo.com/show/21889/trainers.svg"
              alt="Logo"
              className="img-fluid"
              style={{ maxWidth: '60px' }}
            />
          </div>

          <div className="col-md-4 text-center text-md-end">
            <a href="#" className="text-dark me-3 fs-5">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-dark me-3 fs-5">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-dark fs-5">
              <i className="bi bi-google"></i>
            </a>
          </div>

        </div>

        <hr className="my-3" />
        <div className="text-center">
          <p className="text-muted small mb-0">
            © 2025 IoT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
