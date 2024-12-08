import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <section
        style={{
          padding: "40px 0",
          background: "#fff",
          fontFamily: "'Arvo', serif",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", textAlign: "center" }}>
              {/* <div
                style={{
                  backgroundImage:
                    "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
                  height: "400px",
                  backgroundPosition: "center",
                  marginBottom: "-50px",
                }}
              >
                <h1 style={{ fontSize: "80px", margin: 0 }}>404</h1>
              </div> */}
              <div>
                <h3 style={{ fontSize: "40px", margin: "20px 0" }}>
                  Looks like you&apos;re lost
                </h3>
                <p>The page you are looking for is not available!</p>
                <Link
                  to="/"
                  style={{
                    color: "#fff",
                    padding: "10px 20px",
                    background: "#9538E2",
                    margin: "20px 0",
                    display: "inline-block",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                  className="click"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
