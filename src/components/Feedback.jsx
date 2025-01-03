import React, { useState } from 'react'
import './FeedBack.css'
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BsFillEmojiAngryFill, BsFillEmojiFrownFill, BsFillEmojiSmileFill, BsFillEmojiHeartEyesFill, BsFillEmojiLaughingFill } from "react-icons/bs";

function Feedback() {
    const [feedback, setFeedback] = useState({})
    const [emoji, setEmoji] = useState(null)
    const [submit, setSubmit] = useState([])
    const [selected, setSelected] = useState(null)


    const emojiIcons = [
        <BsFillEmojiAngryFill className='fs-1' />,
        <BsFillEmojiFrownFill className='fs-1' />,
        <BsFillEmojiSmileFill className='fs-1' />,
        <BsFillEmojiHeartEyesFill className='fs-1' />,
        <BsFillEmojiLaughingFill className='fs-1' />,
    ]

    const handleMouseOver = (index) => {
        setSelected(index + 1);
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        if (emoji !== null) {
            return setFeedback({ ...feedback, [name]: value, ['emoji']: emoji })
        }
        setFeedback({ ...feedback, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(feedback.emoji && feedback.feedback)) {
            alert('Please select a rating')
            return
        }
        console.log('Emoji:', emoji)
        console.log('Feedback:', feedback.feedback)
        setSubmit([...submit, { ...feedback, emoji }])
        setEmoji(null)
        setFeedback({})
    }

    const handleLeave = () => {
        setSelected(null)
    }

    const handleEmoji = (emoji) => {
        setEmoji(emoji + 1)
        setFeedback({ ...feedback, emoji: emoji + 1 })
    }

    return (
        <>
            <div className="container">
                <div className='d-xl-flex justify-content-between align-items-center vh-100'>
                    <div className="col-12 col-xl-6">
                        <div className="p-3">
                            <div className="card text-center rounded-4 border border-0 shadow-lg">
                                <div className="card-header bg-primary bg-gradient rounded-top-4 text-white">
                                    <div className='d-flex justify-content-between align-items-center p-2'>
                                        <IoIosArrowBack className='fs-5' />
                                        <h5 className='m-0'>FeedBack</h5>
                                        <RxCross2 className='fs-5' />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Your Feedback help us to improve</h5>
                                    <p className="card-text">Please let us know about your experience.</p>
                                    <form onSubmit={handleSubmit} method='post'>
                                        <div className='text-center mb-5'>
                                            {[...Array(5)].map((_, index) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="fs-3 me-3"
                                                        style={{
                                                            cursor: "pointer",
                                                            color: (selected || emoji) >= index + 1 ? "DarkOrange" : "gray",
                                                        }}
                                                        onMouseOver={() => handleMouseOver(index)}
                                                        onMouseLeave={() => handleLeave()}
                                                        onClick={() => handleEmoji(index)}
                                                    >
                                                        {emojiIcons[index]}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                        <div className="mb-3">
                                            <textarea className="form-control bg-secondary-subtle fw-semibold border-0 shadow-sm" id="exampleInputEmail1" name='feedback' placeholder='Write your Feedback here' value={feedback.feedback || ''} onChange={handleChange} rows="4"></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary bg-gradient fw-semibold w-100 shadow mb-3">Send Feedback</button>
                                        <div className='mb-5'>
                                            <a className='text-decoration-none text-secondary fw-semibold'>Continue without sending feedback</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-6">
                        <div className="p-4">
                            {submit.length > 0 && (
                                <div id="feedbackCarousel" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {submit.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                                            >
                                                <div className="card rounded-4 border border-0 shadow-lg h-100 mx-auto" style={{ maxWidth: "80%" }}>
                                                    <div className="card-header bg-primary bg-gradient rounded-top-4 text-white text-center p-3">
                                                        <h5 className="m-0">Feedback {index + 1}</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title mb-3 text-center">Thank you for your feedback!</h4>
                                                        <div className="text-center mb-3">
                                                            <h4>Your Rating</h4>
                                                            <span className="fs-3 text-warning">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="fs-3 me-3"
                                                                        style={{ color: item.emoji > i ? "DarkOrange" : "gray" }}
                                                                    >
                                                                        {emojiIcons[i]}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        </div>
                                                        <h4>
                                                            Feedback: <span className="fs-5 fw-light">{item.feedback}</span>
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Carousel controls */}
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#feedbackCarousel"
                                        data-bs-slide="prev"
                                    >
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#feedbackCarousel"
                                        data-bs-slide="next"
                                    >
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback
