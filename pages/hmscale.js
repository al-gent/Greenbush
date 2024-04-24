import React, { useState, useEffect, useRef } from 'react';
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
import Link from 'next/link';

function InputRow({ data, setData }) {
  const [activity, setActivity] = useState('');
  const [hap, setHap] = useState('');
  const [mean, setMean] = useState('');
  const [time, setTime] = useState('');

  const actRef = useRef(null);
  const hapRef = useRef(null);
  const meanRef = useRef(null);
  const timeRef = useRef(null);
  const refList = [actRef, hapRef, meanRef, timeRef];

  useEffect(() => {
    actRef.current.focus();
  }, []);

  const addData = (e) => {
    e.preventDefault();
    setData([...data, { activity, hap, mean, time }]);
    setActivity('');
    setHap('');
    setMean('');
    setTime('');
    actRef.current.focus();
  };
  return (
    <tr>
      <td>
        <input
          ref={actRef}
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
          ref={hapRef}
          size="2"
          type="tel"
          value={hap}
          onChange={(e) => {
            e.preventDefault();
            const newQuantity = e.target.value;
            setHap(newQuantity);
          }}
        />
      </td>
      <td>
        <input
          ref={meanRef}
          size="2"
          type="tel"
          value={mean}
          onChange={(e) => {
            e.preventDefault();
            const newQuantity = e.target.value;
            setMean(newQuantity);
          }}
        />
      </td>
      <td>
        <input
          ref={timeRef}
          size="2"
          type="tel"
          value={time}
          onChange={(e) => {
            e.preventDefault();
            const newQuantity = e.target.value;
            setTime(newQuantity);
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
          type="tel"
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
          type="tel"
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
          type="tel"
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
  const rows = data.map((item, index) => (
    <EditRow item={item} index={index} data={data} setData={setData} />
  ));

  return (
    <div className={styles.parent}>
      <table>
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
    </div>
  );
}

function EnterData({ data, setData }) {
  const [activity, setActivity] = useState('');
  const [hap, setHap] = useState('');
  const [mean, setMean] = useState('');
  const [time, setTime] = useState('');
  const [lineCount, setLineCount] = useState(0);
  const actRef = useRef(null);
  const hapRef = useRef(null);
  const meanRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    refList[lineCount] && refList[lineCount].current.focus();
    lineCount > 3 && setData([...data, { activity, hap, mean, time }]);
  }, [lineCount]);

  const refList = [actRef, hapRef, meanRef, timeRef];

  return (
    <div
      className={styles.centerCard}
      onKeyDown={(e) => {
        console.log(lineCount);
        if (e.key === 'Enter') {
          e.preventDefault();
          setLineCount(lineCount + 1);
        }
      }}
    >
      <div className={styles.parent}>
        <label>Think of an activity that makes you happy </label>
        <input
          ref={actRef}
          value={activity}
          onChange={(e) => {
            e.preventDefault();
            const newActivity = e.target.value;
            setActivity(newActivity);
          }}
        ></input>
      </div>
      {lineCount > 0 && (
        <div className={styles.parent}>
          <p> Answer the following on a scale from 1-100</p>
          <label>How happy does this activity make you? </label>
          <input
            type="tel"
            ref={hapRef}
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
        <div className={styles.parent}>
          <label>How meaningful is it to you?</label>
          <input
            type="tel"
            ref={meanRef}
            size="2"
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
        <div className={styles.parent}>
          <label>How often do you do it?</label>
          <input
            type="tel"
            ref={timeRef}
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
        <button
          onClick={(e) => {
            {
              lineCount < 3
                ? setLineCount(lineCount + 1)
                : setData([...data, { activity, hap, mean, time }]);
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default function HMScale() {
  const [data, setData] = useState([]);
  return (
    <div className={styles.fullHeightMobile}>
      {data.length === 0 && <EnterData data={data} setData={setData} />}
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height="80%">
          <h3 className={styles.parent}>Happiness vs Meaning</h3>
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
