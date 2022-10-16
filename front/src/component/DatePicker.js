import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
//
const _DatePicker = (props) => {
  //
  const { stateArr } = props;
  const [startDate, setStartDate, endDate, setEndDate] = stateArr;
  //
  // ㅜ onChange() 함수와 state 값을 사용하지 않으면 값이 변동되지 않음
  return (
    <>
      <label>공동 구매 시작 시각 </label>
      <DatePicker selected={startDate} onChange={(date) => dateValidation(date, "start")} minDate={changeToDefaultSeconds(new Date())} timeInputLabel="Time:" dateFormat="yyyy년 MM월 dd일 h:mm aa" showTimeInput />
      <br />
      <label>공동 구매 종료 시각 </label>
      <DatePicker selected={endDate} onChange={(date) => dateValidation(date, "end")} minDate={startDate} timeInputLabel="Time:" dateFormat="yyyy년 MM월 dd일 h:mm aa" showTimeInput />
    </>
  );
  ///////////////////////////////////////////////////////////////////////////////
  /**
   * 현재 이후의 시간을 선택하도록 날짜 및 시간에 대한 유효성을 체크하는 함수 10.12.14
   * @param {object} date
   * @param {string} str
   */
  function dateValidation(date, str) {
    //
    // ㅜ date 값 대신 startDate 값을 사용할 경우 한 박자 늦음
    // console.log(date); // 선택한 값이 바로 제 때에 들어감...
    //
    let now = changeToDefaultSeconds(new Date());
    const selectedTime = changeToDefaultSeconds(date);
    const hourCheck = now.getHours() > selectedTime.getHours();
    const minuteCheck = now.getHours() === selectedTime.getHours() && now.getMinutes() > selectedTime.getMinutes();
    const isToday = now.getFullYear() + now.getMonth() + now.getDate() === selectedTime.getFullYear() + selectedTime.getMonth() + selectedTime.getDate();
    //
    if ((isToday && hourCheck) || (isToday && minuteCheck)) {
      //
      alert("현재보다 이전 시간은 선택할 수 없습니다.");
      //
      now = changeToDefaultSeconds(new Date());
      //
      if (str === "start") {
        //
        setStartDate(now);
      }
      //
      else if (str === "end") {
        //
        setEndDate(now);
      }
      return;
    }
    if (str === "start") {
      //
      setStartDate(selectedTime);
      //
      if (endDate < selectedTime) {
        //
        setEndDate(selectedTime);
      }
    }
    //
    else if (str === "end") {
      //
      setEndDate(selectedTime);
    }
  }
  function changeToDefaultSeconds(_date) {
    //
    const date = _date.getDate();
    const hour = _date.getHours();
    const month = _date.getMonth();
    const year = _date.getFullYear();
    const minute = _date.getMinutes();
    //
    return new Date(year, month, date, hour, minute, 0);
  }
};
export default _DatePicker;
