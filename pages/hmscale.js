import React, { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Label,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import styles from '/styles/index.module.css';

function InputRow({ data, setData }) {
  const [activity, setActivity] = useState('');
  const [hap, setHap] = useState('');
  const [mean, setMean] = useState('');
  const [time, setTime] = useState('');
  const addData = (e) => {
    e.preventDefault();
    setData([...data, { activity, hap, mean, time }]);
    console.log(data);
    setActivity('');
    setHap('');
    setMean('');
    setTime('');
  };
  return (
    <tr>
      <td>
        <input
          size="10"
          type="text"
          value={activity}
          onChange={(e) => {
            e.preventDefault();
            const newActivity = e.target.value;
            setActivity(newActivity);
          }}
        />
      </td>
      <td>
        <input
          size="2"
          type="integer"
          value={hap}
          onChange={(e) => {
            e.preventDefault();
            const newQuantity = e.target.value;
            setHap(parseFloat(newQuantity));
          }}
        />
      </td>
      <td>
        <input
          size="2"
          type="integer"
          value={mean}
          onChange={(e) => {
            e.preventDefault();
            const newQuantity = e.target.value;
            setMean(parseFloat(newQuantity));
          }}
        />
      </td>
      <td>
        <input
          size="2"
          type="integer"
          value={time}
          onChange={(e) => {
            e.preventDefault();
            const newQuantity = e.target.value;
            setTime(parseFloat(newQuantity));
          }}
        />
      </td>
      <td>
        <button onClick={addData}>Add </button>
      </td>
    </tr>
  );
}

function EditRow({ item, index, data, setData }) {
  const [activity, setActivity] = useState(item.activity);
  const [hap, setHap] = useState(item.hap);
  const [mean, setMean] = useState(item.mean);
  const [time, setTime] = useState(item.time);
  return (
    <tr key={index}>
      <td>
        <input
          size="10"
          type="text"
          value={activity}
          onChange={(e) => {
            e.preventDefault();
            const newActivity = e.target.value;
            setActivity(newActivity);
          }}
          onBlur={(e) => {
            setData(
              data.map((dataItem) =>
                dataItem === item
                  ? { ...dataItem, activity: activity }
                  : dataItem,
              ),
            );
          }}
        />
      </td>
      <td>
        <input
          size="2"
          type="integer"
          value={hap}
          onChange={(e) => {
            e.preventDefault();
            const newHap = e.target.value;
            setHap(newHap);
          }}
          onBlur={(e) => {
            setData(
              data.map((dataItem) =>
                dataItem === item ? { ...dataItem, hap: hap } : dataItem,
              ),
            );
          }}
        />
      </td>
      <td>
        <input
          size="2"
          type="integer"
          value={mean}
          onChange={(e) => {
            e.preventDefault();
            const newMean = e.target.value;
            setMean(newMean);
          }}
          onBlur={(e) => {
            setData(
              data.map((dataItem) =>
                dataItem === item ? { ...dataItem, mean: mean } : dataItem,
              ),
            );
          }}
        />
      </td>
      <td>
        <input
          size="2"
          type="integer"
          value={time}
          onChange={(e) => {
            e.preventDefault();
            const newTime = e.target.value;
            setTime(newTime);
          }}
          onBlur={(e) => {
            setData(
              data.map((dataItem) =>
                dataItem === item ? { ...dataItem, time: time } : dataItem,
              ),
            );
          }}
        />
      </td>
    </tr>
  );
}

function DataTable({ data, setData }) {
  const [edit, setEdit] = useState(false);

  const rows = data.map((item, index) => (
    <EditRow item={item} index={index} data={data} setData={setData} />
  ));

  return (
    <table className={styles.mobileCard}>
      <thead>
        <tr>
          <th>Activity</th>
          <th>Hapiness</th>
          <th>Meaning</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <InputRow data={data} setData={setData} />
        {rows}
      </tbody>
    </table>
  );
}

function EnterData({ data, setData }) {
  const [activity, setActivity] = useState('');
  const [hap, setHap] = useState('');
  const [mean, setMean] = useState('');
  const [time, setTime] = useState('');
  const [lineCount, setLineCount] = useState(0);

  const addData = (e) => {
    e.preventDefault();
    setData([...data, { activity, hap, mean, time }]);
    console.log(data);
    setActivity('');
    setHap('');
    setMean('');
    setTime('');
  };

  return (
    <form className={styles.infoCard}>
      <div>
        <label>Think of an activity that makes you happy </label>
        <input
          size="15"
          value={activity}
          onChange={(e) => {
            e.preventDefault();
            const newActivity = e.target.value;
            setActivity(newActivity);
          }}
        ></input>
      </div>
      {lineCount > 0 && (
        <div>
          <label>On a scale from 1-100 - how happy does this make you? </label>
          <input
            size="2"
            value={hap}
            onChange={(e) => {
              e.preventDefault();
              const newRating = e.target.value;
              setHap(newRating);
            }}
          ></input>
        </div>
      )}
      {lineCount > 1 && (
        <div>
          <label>
            On a scale from 1-100 - how meaningful is this activity to you?
          </label>
          <input
            size="2"
            placeholder={'3'}
            value={mean}
            onChange={(e) => {
              e.preventDefault();
              const newRating = e.target.value;
              setMean(newRating);
            }}
          ></input>
        </div>
      )}
      {lineCount > 2 && (
        <div>
          <label>{`Estimate how much time you spend at this activity in hours per week`}</label>
          <input
            size="2"
            value={time}
            onChange={(e) => {
              e.preventDefault();
              const newTime = e.target.value;
              setTime(newTime);
            }}
          ></input>
        </div>
      )}
      <div>
        {lineCount < 3 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setLineCount(lineCount + 1);
            }}
          >
            Continue
          </button>
        )}
        {lineCount > 2 && <button onClick={addData}>Continue </button>}
      </div>
    </form>
  );
}

export default function App() {
  const [data, setData] = useState([]);
  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0,
  );
  console.log(data);
  return (
    <div className={styles.fullHeightMobile}>
      {data.length === 0 && <EnterData data={data} setData={setData} />}
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height="80%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey="hap"
              type="number"
              name="happiness"
              domain={[0, 100]}
              //   hide="False"
            >
              <Label value="Happiness" position="bottom" />
            </XAxis>
            <YAxis
              dataKey="mean"
              domain={[0, 100]}
              type="number"
              name="meaning"
              //   hide="False"
            >
              <Label value="Meaning" position="center" angle="90" />
            </YAxis>
            <ZAxis
              dataKey="time"
              type="number"
              // domain={[0, 100]}
              range={[500, 4000]}
              name="time"
              unit="hrs / week"
              scale="linear"
            />
            <Scatter data={data} fill="#82ca9d">
              <LabelList dataKey="activity" position="center" angle="15" />
            </Scatter>
          </ScatterChart>
          <DataTable data={data} setData={setData} />
        </ResponsiveContainer>
      )}
    </div>
  );
}
