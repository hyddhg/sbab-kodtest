"use client";
import { AccordionDetails, Typography } from "@mui/material";
import StopListType from "@/types/StopListType";
import StopPointType from "@/types/StopPointType";
import Stops from "@/components/Stops";

interface LineDetailsProps {
  lineNumber: string;
  allStops: StopPointType[];
  stops: StopListType;
}

export default function LineDetails(props: LineDetailsProps) {
  const { lineNumber, allStops, stops } = props;

  return (
    <AccordionDetails>
      <Typography>Alla stop för linje {lineNumber}:</Typography>

      <Stops allStops={allStops} stops={stops} />
    </AccordionDetails>
  );
}
