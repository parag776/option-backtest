import React from "react";

function ReviewCard(props) {

    const starSymbol = String.fromCharCode(11088);
    const stars = Array(props.rating).fill(starSymbol).join('');

  return (
    <div className="d-flex flex-column bg-secondary p-5 rounded-5">
    <div >{stars}</div>
    <div className="fs-5 mt-4 color-light-secondary">{props.comment}</div>
    <div className="mt-4 d-flex align-items-center">
        <img className="rounded-circle d-inline-block" style={{width: "4em"}} src={props.img} alt="profile" />
        <div className="d-inline-block mx-4">
            <h5 className="fs-5 fw-bold">{props.name}</h5>
            <h6 className="fs-6 color-light-secondary">{props.designation}</h6>
        </div>
    </div>
    </div>
  );
}

ReviewCard.defaultProps = {
    rating: 5,
    comment: "awesome",
    name: "Parag",
    designation: "Programmer",
    img: "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.webp"
}

export default ReviewCard;
