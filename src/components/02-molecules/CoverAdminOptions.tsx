import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const CoverAdminOptions = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={304}
      flexDirection={{ xs: "column", md: "row" }}
    >
      <Box>
        <img
          src="/static/images/settings/engrenagem.svg"
          alt="Quebra Cabeca"
          width={200}
          height={150}
        />
      </Box>

      <Box>
        <Box>
          <Typography color={"green"} fontSize={50}>
            ADM OPTIONS
          </Typography>
        </Box>
        <Box>
          <img
            src="/static/images/task/home/detail.svg"
            alt="4 Pontos Interligados"
            width={75}
          />
        </Box>
      </Box>

      <Box style={{ position: "relative" }}>
        <Box
          style={{
            position: "absolute",
            top: "calc(50%  + 100px)",
            left: "calc(50%  + 250px)",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <img
            src="/static/images/settings/astronaut.svg"
            alt="astronaut"
            width={551}
            height={325}
            style={{
              pointerEvents: "none",
            }}
          />
        </Box>

        <img
          src="/static/images/settings/smoke-blue.svg"
          alt="smoke"
          width={966}
          height={869}
          style={{
            position: "absolute",
            top: "calc(50%  + 230px)",
            left: "calc(50% + 300px)",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
};

export default CoverAdminOptions;
