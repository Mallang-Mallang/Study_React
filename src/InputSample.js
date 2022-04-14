import React, { useState } from "react";

function InputSample() {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText("");
  };
  return (
    <div>
      {/* 값이 바뀌고 input을 비우려면 value값을 설정 */}
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {text}
      </div>
    </div>
  );
}

export default InputSample;
