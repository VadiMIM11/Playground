import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container d-flex align-items-center">
      <div
        className="container md-4 d-flex justify-content-center align-items-center text-white"
        style={{ height: "100vh" }}
      >
        <div
          className="d-flex flex-column rounded-3 justify-content-around bg-dark border border-secondary p-5"
          // style={{ height: "30vh", width: "30vw" }}

        >
          <h1><b>Welcome to Meeting Scheduler!</b></h1>
          <h3>Create New Event or Join existing one</h3>
          <div className="d-flex justify-content-between">
            <Link href={"/create"} className="btn btn-secondary">Create</Link>
            <Link href={"/join"} className="btn btn-secondary">Join</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
