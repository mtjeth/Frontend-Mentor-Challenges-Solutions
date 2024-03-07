const Attribute = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        color: "hsl(236, 100%, 87%)",
        paddingTop:"20px",
        paddingBottom:"40px"
      }}
    >
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        rel="noreferrer"
        target="_blank"
        style={{
          color: "hsl(246, 80%, 60%)",
          marginInline: "5px",
        }}
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        rel="noreferrer"
        href="https://github.com/mtjeth"
        target="_blank"
        style={{
          color: "hsl(246, 80%, 60%)",
          marginInline: "5px",
        }}
      >
        MTJ
      </a>
    </div>
  );
};

export default Attribute;
