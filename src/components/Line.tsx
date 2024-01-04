"use client";
import { Typography } from "@mui/material";
import LineCountType from "@/types/LineCountType";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LineDetails from "@/components/LineDetails";
import StopPointType from "@/types/StopPointType";

interface LineProps {
  line: LineCountType;
  allStops: StopPointType[];
}

export default function Line(props: LineProps) {
  const {
    line: { lineNumber, stopCount, stops },
    allStops,
  } = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-content-${lineNumber}`}
        id={`panel-header-${lineNumber}`}
      >
        <Typography>
          Linje {lineNumber} med {stopCount} stopp
        </Typography>
      </AccordionSummary>
      <LineDetails lineNumber={lineNumber} stops={stops} allStops={allStops} />
    </Accordion>
  );
}
