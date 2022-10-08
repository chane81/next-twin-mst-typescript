const format = (t) =>
  `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`;
const pad = (n) => (n < 10 ? `0${n}` : n);

const Clock = (props) => {
  const divStyle = {
    backgroundColor: props.light ? '#999' : '#000',
    color: '#82FA58',
    display: 'inline-block',
    font: '50px menlo, monaco, monospace',
    padding: '15px',
  };

  const aa = [
    '1',
    '2',
    '3',
    '1',
    '2',
    '3',
    '1',
    '2',
    '3',
    '1',
    '2',
    '3',
    '1',
    '2',
    '3',
  ];

  return <div style={divStyle}>{format(new Date(props.lastUpdate))}</div>;
};

export default Clock;
