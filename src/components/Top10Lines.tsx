"use client";

import { Box, Container, Typography } from "@mui/material";
import ApiResultType from "@/types/ApiResultType";
import LineStopType from "@/types/LineStopType";
import LineCountType from "@/types/LineCountType";
import StopPointType from "@/types/StopPointType";
import Line from "@/components/Line";
import { useMemo } from "react";
import CountedLinesType from "@/types/CountedLinesType";

function compareLineCount(a: LineCountType, b: LineCountType) {
  return b.stopCount - a.stopCount;
}

interface Top10LinesProps {
  StopPointData: ApiResultType<StopPointType>;
  LineData: ApiResultType<LineStopType>;
}

export default function Top10Lines(props: Top10LinesProps) {
  const { StopPointData, LineData } = props;

  // let LineData = emptyResponse;

  const top10Lines = useMemo(() => {
    const startValue: CountedLinesType = {};

    // Count the stops for each line
    const countedLines: CountedLinesType = LineData.ResponseData.Result.reduce(
      (
        result: CountedLinesType,
        current: { LineNumber: string; JourneyPatternPointNumber: string }
      ) => {
        if (Object.hasOwn(result, current.LineNumber)) {
          // The line exists, count the line and save the stop
          const currentLine = result[current.LineNumber];
          currentLine.count = (currentLine.count || 0) + 1;
          currentLine.stops.push(current.JourneyPatternPointNumber);
        } else {
          // A new line was found, start counting the line
          let currentLine = {
            count: 1,
            stops: [current.JourneyPatternPointNumber],
          };
          result[current.LineNumber] = currentLine;
        }
        return result;
      },
      startValue
    );

    // Create an array with a format that is easier to sort
    const countedLinesArray: LineCountType[] = [];
    for (const [key, value] of Object.entries(countedLines)) {
      countedLinesArray.push({
        lineNumber: key,
        stopCount: value.count,
        stops: value.stops,
      });
    }

    // Sort with the most stops in the beginning of the array
    countedLinesArray.sort(compareLineCount);

    // Get the first 10 that are the top 10
    return countedLinesArray.slice(0, 10);
  }, [LineData.ResponseData.Result]);

  return (
    <Container>
      <Box>
        <Typography variant="h1">Linjetoppen</Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
          Se vilken av SLs busslinjer som har flest stop just nu!
        </Typography>
        {top10Lines.map((line: LineCountType) => (
          <Line
            key={line.lineNumber}
            line={line}
            allStops={StopPointData.ResponseData.Result}
          />
        ))}
      </Box>
    </Container>
  );
}
