import LineDataJson from "@/data/JourneyPatternPointOnLine.json";
import StopPointDataJson from "@/data/StopPoint.json";
import ApiResultType from "@/types/ApiResultType";
import LineStopType from "@/types/LineStopType";
import StopPointType from "@/types/StopPointType";
import Top10Lines from "@/components/Top10Lines";
import getStops from "@/utils/getStops";
import getLineStops from "@/utils/getLineStops";

export default async function Linjetoppen() {
  let StopPointData: ApiResultType<StopPointType> = {
    StatusCode: 0,
    Message: null,
    ExecutionTime: 0,
    ResponseData: {
      Version: "",
      Type: "",
      Result: [],
    },
  };

  let LineData: ApiResultType<LineStopType> = {
    StatusCode: 0,
    Message: null,
    ExecutionTime: 0,
    ResponseData: {
      Version: "",
      Type: "",
      Result: [],
    },
  };
  if (process.env.API_LIVE === "true") {
    [StopPointData, LineData] = await Promise.all([getStops(), getLineStops()]);
  } else {
    StopPointData = StopPointDataJson as ApiResultType<StopPointType>;
    LineData = LineDataJson as ApiResultType<LineStopType>;
  }

  return <Top10Lines StopPointData={StopPointData} LineData={LineData} />;
}
