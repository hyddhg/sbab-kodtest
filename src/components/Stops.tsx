"use client";
import { Container, Box } from "@mui/material";
import StopListType from "@/types/StopListType";
import StopPointType from "@/types/StopPointType";

interface StopsProps {
  stops: StopListType;
  allStops: StopPointType[];
}
export default function Stops(props: StopsProps) {
  const { stops, allStops } = props;

  return (
    <Container>
      {stops.map((stopId: string, index: number) => {
        const stopFind = allStops.find(
          (stop: StopPointType) => stop.StopPointNumber === stopId
        );
        return (
          <Box
            key={index} // Non unique data so I use the index
          >
            {stopFind?.StopPointName}
          </Box>
        );
      })}
    </Container>
  );
}
