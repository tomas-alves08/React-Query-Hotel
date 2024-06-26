import { FC, ReactNode } from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { IBooking, IStartData } from "../../utils/schemas";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext";

interface IChartBoxProps {
  children: ReactNode;
}
const ChartBox: FC<IChartBoxProps> = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight: IStartData[] = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark: IStartData[] = [
  {
    duration: "1 night",
    value: 6,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 2,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 3,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 1,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 11,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 9,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 13,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 6,
    color: "#7e22ce",
  },
];

// interface IprepareDataProps {
//   startData: IStartData[];
//   stays: number;
// }

const prepareData = (startData: IStartData[], stays: IBooking[] | null) => {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr: IStartData[], field: string) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  if (!stays) return;

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num ?? 0)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num ?? 0)) return incArrayValue(arr, "6-7 nights");
      if ((num ?? 0) >= 8 && (num ?? 0) <= 14)
        return incArrayValue(arr, "8-14 nights");
      if ((num ?? 0) >= 15 && (num ?? 0) <= 21)
        return incArrayValue(arr, "15-21 nights");
      if ((num ?? 0) >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
};

// Custom Legend Component
const CustomLegend = ({ payload }: any) => {
  const { isDarkMode } = useDarkMode();
  return (
    <ul
      style={{
        listStyleType: "none",
        margin: "0 0 0 -3rem",
        padding: 0,
        fontSize: "1.2rem",
        color: isDarkMode ? "#fff" : "#374151",
      }}
    >
      {payload.map((entry: any, index: number) => {
        return (
          <li
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
              width: "8rem",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: entry.color,
                marginRight: "4px",
              }}
            ></span>
            {entry.payload.duration}
          </li>
        );
      })}
    </ul>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ payload }: any) => {
  return (
    <ul
      style={{
        listStyleType: "none",
        margin: "0 0 0 -3rem",
        padding: 0,
        fontSize: "1.2rem",
        color: "#fff",
      }}
    >
      {payload.map((entry: any, index: number) => {
        return (
          <li
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
              width: "fit-content",
              backgroundColor: "#424242",
              borderRadius: "100px",
              padding: "5px 10px",
            }}
          >
            <span
              style={{
                marginRight: "6px",
              }}
            >
              {entry.payload.duration}:
            </span>
            <span
              style={{
                fontWeight: "600",
              }}
            >
              {entry.payload.value}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

interface IDurationChartProps {
  confirmedStays: IBooking[] | null;
}
const DurationChart: FC<IDurationChartProps> = ({ confirmedStays }) => {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;

  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            name="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data?.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend
            verticalAlign="middle"
            align="right"
            width={35}
            layout="vertical"
            iconSize={15}
            iconType="circle"
            content={CustomLegend}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

export default DurationChart;
