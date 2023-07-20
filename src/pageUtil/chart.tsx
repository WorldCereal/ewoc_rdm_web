import { BarChart } from "recharts/src/chart/BarChart";
import { Bar } from "recharts/src/cartesian/Bar";

import { ResponsiveContainer } from "recharts/src/component/ResponsiveContainer";
import { useState } from "react";
import { CartesianGrid } from "recharts/src/cartesian/CartesianGrid";
import { XAxis } from "recharts/src/cartesian/XAxis";
import { YAxis } from "recharts/src/cartesian/YAxis";
import { classNames } from "../utils/Helper";
import { LabelList } from "recharts/src/component/LabelList";
import { Tooltip } from "recharts/src/component/Tooltip";

import { Cell } from "recharts/src/component/Cell";
import { Legend } from "recharts/src/component/Legend";
import { PieChart } from "recharts/src/chart/PieChart";
import { Pie } from "recharts/src/polar/Pie";

const COLORS = [
  "#E84A5F",
  "#00b159",
  "#00aedb",
  "#f37735",
  "#4a4e4d",
  "#0057e7",
  "#ffc425",
  "#008744",
  "#eb6841",
  "#cc2a36",
  "#4f372d",
  "#00a0b0",
  "#d11141",
  "#fe4a49",
  "#ffa700",
  "#3da4ab",
  "#fe8a71",
  "#ff6f69",
  "#ffcc5c",
  "#88d8b0",
  "#d62d20",
  "#2ab7ca",
  "#0e9aa7",
  "#f6cd61",
  "#ffeead",
];

interface ChartData {
  name: string;
  value: number;
}

interface WChartProps {
  data: ChartData[];
  total: number;
  type: number;
}

function renderColorfulLegendText(value: string, entry: any) {
  const { color } = entry;
  return (
    <span className="text-xs" style={{ color }}>
      {value}
    </span>
  );
}

function BarAppChart(props: WChartProps) {
  function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <div className="rounded-md bg-gray-100 px-2 py-1 text-blue-700">
          <label>
            {`${label}: ${((100 * payload[0].value) / props.total).toFixed(
              1
            )}%`}{" "}
          </label>
          <label>{`feature count: ${payload[0].value}`}</label>
        </div>
      );
    }

    return null;
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={props.data.length > 10 ? 800 : 400}
    >
      <BarChart
        layout="vertical"
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" stroke="#FFFFFF" fontSize="12" />

        <Bar dataKey="value" fill="#4a5568">
          <LabelList
            textBreakAll           
            position="insideRight"
            fontSize="0"
            style={{ fill: "white" }}
          />
          {props.data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              display={entry.name}
              fill={COLORS[index % COLORS.length]}
              className="overflow-hidden break-words text-clip"
            />
          ))}
        </Bar>
        {AppLegend(props)}
      </BarChart>
    </ResponsiveContainer>
  );
}

function AppLegend(props: WChartProps) {
  return (
    <>
      {props.data.length < 30 ? (
        <Legend
          formatter={renderColorfulLegendText}
          payload={props.data.map((item, index) => ({
            id: item.name,
            type: "square",
            value: `${item.name} `,
            color: COLORS[index % COLORS.length],
          }))}
        />
      ) : (
        <Legend
          formatter={renderColorfulLegendText}
          payload={props.data.slice(0, 30).map((item, index) => ({
            id: item.name,
            type: "square",
            value: `${item.name} `,
            color: COLORS[index % COLORS.length],
          }))}
        />
      )}
    </>
  );
}

function WChart(props: WChartProps) {
  function CustomTooltip({ active, payload }) {
    if (active) {
      return (
        <div className="rounded-md bg-gray-100 px-2 py-1 text-blue-700">
          <label>
            {`${payload[0].name}: ${(
              (100 * payload[0].value) /
              props.total
            ).toFixed(1)}%`}{" "}
          </label>
          <label>{`feature count: ${payload[0].value}`}</label>
        </div>
      );
    }

    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={props.data}
          color="#000000"
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
        >
          {props.data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              display={entry.name}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {AppLegend(props)}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function CustomChart(props: WChartProps) {
  const [top10, setTop10] = useState(false);
  const [removeNoInfo, setRemoveNoInf] = useState(false);

  if (props.data === undefined) {
    return <div>Loading...</div>;
  }

  function getData() {
    const items = removeNoInfo
      ? props.data.filter((x) => x.name.indexOf("No Information") === -1)
      : props.data;
    return top10 ? items.slice(0, 10) : items;
  }

  return (
    <div className="text-center">
      {props.data.length > 1 && (
        <div className="flex-1">
          <button
            className={classNames(
              top10 ? "bg-gray-400 border-gray-700" : "",
              "items-center shadow-sm px-2 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100"
            )}
            onClick={() => {
              setTop10(!top10);
            }}
          >
            {top10 ? "Clear 'Top 10' filter" : "Show Top 10"}
          </button>
          <button
            className={classNames(
              removeNoInfo ? "bg-gray-400 border-gray-700" : "",
              "items-center ml-4 shadow-sm px-2 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100"
            )}
            onClick={() => {
              setRemoveNoInf(!removeNoInfo);
            }}
          >
            {removeNoInfo
              ? "Clear 'No Information' filter"
              : "Filter No Information"}
          </button>
        </div>
      )}
      {props.type == 0 ? (
        <BarAppChart
          data={getData()}
          total={
            top10 || removeNoInfo
              ? getData()
                  .slice(0, 10)
                  .reduce((sum, current) => sum + current.value, 0)
              : props.total
          }
          type={props.type}
        />
      ) : (
        <WChart
          data={getData()}
          total={
            top10 || removeNoInfo
              ? getData()
                  .slice(0, 10)
                  .reduce((sum, current) => sum + current.value, 0)
              : props.total
          }
          type={props.type}
        />
      )}
    </div>
  );
}
