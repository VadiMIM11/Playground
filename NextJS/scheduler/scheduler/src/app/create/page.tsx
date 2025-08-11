
import { ArrowRightCircleIcon } from "@heroicons/react/16/solid";
//import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function Page() {

    return (
        <div className="container d-flex align-items-center">
            <div
                className="container md-4 d-flex justify-content-center align-items-center text-white"
                style={{ height: "100vh" }}
            >
                <div className="d-flex flex-column rounded-3 justify-content-around bg-dark border border-secondary p-5">
                    <h1 className="text-center mb-3 ">
                        <b>Create New Event</b>
                    </h1>
                    <form>

                        <div data-bs-theme="dark" className="input-group flex-nowrap mb-3">
                            <span className="input-group-text" id="inputEventName">
                                Event Name
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your Event Name..."
                                aria-label="Event Name"
                                aria-describedby="inputEventName"
                            />
                            <button type="submit" className="btn bg-body-tertiary border"> <ArrowRightCircleIcon  style={{ color: 'lightgray',  width: "25px", height: "25px" }}/></button>
                        </div>


                        {/* <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputWeekStart">
                                Week Starts With
                            </label>
                            <select className="form-select" id="inputWeekStart">
                                <option value={'Sunday'}>Sunday</option>
                                <option value={'Monday'}>Monday</option>
                            </select>
                        </div>


                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputTimeFormat">
                                Time Format
                            </label>
                            <select className="form-select" id="inputTimeFormat">
                                <option value={'12hr'}>12 Hour Time</option>
                                <option value={'24hr'}>24 Hour Time</option>
                            </select>
                        </div> */}
                    </form>

                </div>
            </div>
        </div>
    );
}
