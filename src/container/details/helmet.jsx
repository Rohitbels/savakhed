import React from "react";
import { Helmet } from "react-helmet";

export default function HelmetMetaData(props) {
    console.log(props)
    let currentUrl = window.location.href;
    let quote = props.quote !== undefined ? props.quote : props.bookName;
    let title = props.bookName;
    let image = props.image != " " ? props.image : "https://storage.googleapis.com/cmperstribe_storage_usha/Banner/IMG_3640.JPG";
    let description = props.description !== undefined ? props.description : props.bookName;
    return (
        <Helmet>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content={image} />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <link rel="apple-touch-icon" href={image} data-react-helmet="true" />
            <meta name="description" content={title} />
            <meta rel="icon" href={image} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="Book details" />
            <meta property="og:description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </Helmet>
    );
}
