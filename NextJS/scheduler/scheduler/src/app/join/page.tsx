"use client";

import { useState } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/16/solid";


// TODO use actions to submit form and make page a server component
export default function Page() {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const res = await fetch("/api/submit-event-link", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const json = await res.json();
                setError(json.error || "Something went wrong");
            } else {
                // Redirect or show success UI
                window.location.href = "/event/success";
            }
        } catch (err) {
            setError("Network error");
        }
    }

    return (
        <div className="container d-flex align-items-center">
            <div
                className="container md-4 d-flex justify-content-center align-items-center text-white"
                style={{ height: "100vh" }}
            >
                <div className="d-flex flex-column rounded-3 justify-content-around bg-dark border border-secondary p-5">
                    <h1>
                        <b>Enter link to your event</b>
                    </h1>
                    <form data-bs-theme="dark" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row justify-content-center align-items-center">

                            <div data-bs-theme="dark" className="input-group flex-nowrap mb-3">
                                <input
                                    type="url"
                                    name="link"
                                    placeholder="https://example.com/your-event"
                                    className="form-control"
                                    required
                                />
                                <button type="submit" className="btn bg-body-tertiary border"> <ArrowRightCircleIcon style={{ color: 'lightgray', width: "25px", height: "25px" }} /></button>
                            </div>


                        </div>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </div>
    );
}
