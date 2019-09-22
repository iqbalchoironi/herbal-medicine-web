import React from "react";

function Footer(props) {
  return (
    <footer>
      <div
        style={{
          width: "100%",

          backgroundColor: "grey",
          //height: '300px',
          //backgroundImage: `url(/asset/footer.png)`,
          //backgroundSize: 'cover',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "rgba(255, 255, 255, 0.75)"
        }}
      >
        {/* <div
          style={{
            width: "90%",
            display: "flex"
          }}
        >
          <div
            style={{
              width: "70%",
              height: "200px"
            }}
          >
            <h4
              style={{
                marginBottom: "20px",
                fontWeight: "300",
                lineHeight: "30px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "Work Sans",
                fontSize: "12px"
              }}
            >
              Address and Website
            </h4>
            <p
              style={{
                fontSize: "12px"
              }}
            >
              Departemen Ilmu Komputer Jl Meranti Wing 20 Level 5 Kampus IPB
              Darmaga 16680
            </p>
            <p
              style={{
                fontSize: "12px"
              }}
            >
              0251-8625584
            </p>
            <p
              style={{
                fontSize: "12px"
              }}
            >
              0251-8625584
            </p>
            <p
              style={{
                fontSize: "12px"
              }}
            >
              ilkom@apps.ipb.ac.id
            </p>
          </div>
          <div
            style={{
              width: "30%",
              height: "200px"
            }}
          >
            <h4
              style={{
                marginBottom: "20px",
                fontWeight: "300",
                lineHeight: "30px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "Work Sans",
                fontSize: "12px"
              }}
            >
              Follow KMSJamu in :
            </h4>
            <p
              style={{
                fontSize: "12px"
              }}
            >
              Departemen Ilmu Komputer Jl Meranti Wing 20 Level 5 Kampus IPB
              Darmaga 16680
            </p>
            <p
              style={{
                fontSize: "12px"
              }}
            >
              0251-8625584
            </p>
            <p
              style={{
                fontSize: "12px"
              }}
            >
              0251-8625584
            </p>
            <p
              style={{
                fontSize: "12px"
              }}
            >
              ilkom@apps.ipb.ac.id
            </p>
          </div>
        </div> */}
        <div
          style={{
            margin: "auto",
            width: "100%"
          }}
        >
          {/* <hr /> */}
          <p
            style={{
              fontSize: "12px",
              textAlign: "center"
            }}
          >
            © 2019 KMSJamu <br />
            Knowledge Management System Jamu
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
