<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Include your CSS stylesheets and other head elements here -->
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }

        .container {
            width: 80%;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        / Added margin at the top /
        margin-bottom: 20px;
        / Added margin at the bottom /
        }

        .header {
            height: 60vh;
            background: #0051A8;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 16px;
            margin-bottom: 20px;
        / Added margin below the header /
        }

        .header img {
            height: 40px;
        }

        .header h1 {
            font-weight: bold;
            color: #ffc00c;
            text-align: center;
            font-size: 6rem;
            margin: 0;
        }

        .header h2 {
            color: #fff;
            text-align: center;
            margin-top: 10px;
        }

        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 50vh;
        }

        .email-section,
        .location-section {
            display: flex;
            align-items: center;
            margin-bottom: -30px;
        }

        .icon {
            font-size: 7rem;
            margin-right: 20px;
        }

        .email-text,
        .location-text {
            color: #000;
            font-weight: bold;
            font-size: 1.5rem;
            margin-top: 35px;
        / margin-bottom: 25px; /

        }

        .details-box {
            background: #0051A8;
            margin: 0 10px;
            height: 25vh;
            margin-bottom: 30px;
            margin-top: 90px;
            color: #fff;
        }

        .details-container {
            display: flex;
            justify-content: space-between;
            padding: 1.5rem;
        }

        .details-column {
            width: 50%;
            height: 17vh;
            padding: 0 1rem;
        }

        .footer {
            padding: 0 1.5rem;
            margin-bottom: 20px;
        / Added margin at the bottom of the footer /
        text-align: center;
        }

        .thank-you-message {
            font-weight: bold;
            font-size: 1.5rem;
            color: #0051A8;
        }
        @media only screen and (max-width: 768px) {
            .container {
                width: 100%;
                padding: 10px;
            }

            .header h1 {
                font-size: 3rem;
            }

            .header h2 {
                font-size: 1.5rem;
            }

            .content {
                height: auto;
            }

            .email-section,
            .location-section {
                flex-direction: column;
                align-items: flex-start;
                text-align: center;
                margin-bottom:10px;
            }

            .icon {
                margin-right: 0;
                margin-bottom: 10px;
            }

            .email-text,
            .location-text {
                margin-top: 10px;
            }

            .details-box {
                height: auto;
                margin-top: 20px;
                margin-bottom: 20px;
            }

            .details-container {
                flex-direction: column;
            }

            .details-column {
                width: 100%;
                height: auto;
                margin-bottom: 20px;
            }
        }
        @media only screen and (max-width: 500px) {
            .header h1 {
                font-size: 2rem;
            }

            .header h2 {
                font-size: 1rem;
            }

            .email-text,
            .location-text {
                font-size: 1rem;
            }

            .details-column h2 {
                font-size: 1.2rem;
            }

            .details-column p {
                font-size: 0.8rem;
            }

            .thank-you-message {
                font-size: 1rem;
            }
        }
        @media only screen and (min-width: 769px) and (max-width: 1200px) {
            .container {
                width: 90%;
            }
        }

    </style>
</head>

<body>

<div class="container">
    <div class="header">
        <img src="{{ asset('img/logo2.png') }}" alt="Logo" />
        <h1>Vă Mulțumim!</h1>
        <h2>pentru Alegerea Veloce Plus!</h2>
        <h4 style="margin-top:3px;font-weight: bold;color: #ffc00c; text-align: center">
            Order Id : <b>{{ $order->id }}</b>
        </h4>
    </div>
    <div class="content">
        <div class="email-section">
            <div class="icon">📧</div>
            <div>
                <p class="email-text">
                    Stimate Client, ID-ul unic al comenzii dumneavoastră este:
                    <span style="background: yellow; border-radius: 55px; padding:10px 7px;">{{ $order->id }}
                        </span>
                    . Coletele dumneavoastra vor fi in drum spre UK-to-Moldova
                </p>

            </div>
        </div>
        <div class="location-section">
            <div>
                <p class="location-text">
                    Echipa Veloce Plus vă va contacta în curând pentru a confirma detaliile comenzii, inclusiv ziua
                    și
                    ora colectării coletului de la domiciliu. Peste câteva zile, destinatarul va fi informat despre
                    statusul acestuia. La apropierea de destinație, destinatarul va stabili ziua și ora livrării la
                    domiciliu. La primire, este necesară confirmarea ID-ului unic al comenzii și a numelui.
                </p>
            </div>
            <div class="icon">📍</div>
        </div>
    </div>
    <div class="details-box">
        <div class="details-container">
            <div class="details-column">

                <h2 style="color: #ffc00c">Detalii Punct de Expediere:</h2>
                <div>
                    @if (!empty($order->sender_collection_points_id))
                        <p>
                            Adresa:
                            {{ !empty($order->sender_collection_points_id) ? $order->recipient->sender_collection_point->address : 'Not Found' }}
                        </p>
                        <p>
                            Destinaţie:
                            {{ !empty($order->sender_collection_points_id) ? $order->recipient->sender_collection_point->sides : 'Not Found' }}
                        </p>
                        <p>
                            Telefon:
                            {{ !empty($order->sender_collection_points_id) ? $order->recipient->sender_phone : 'Not Found' }}
                        </p>
                    @else
                        <p>Veți fi contactat(ă) de unul din șoferii noștri în scurt timp pentru a confirma comanda!
                            Vă mulțumim!
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffc00c"
                                 class="bi bi-truck" viewBox="0 0 16 16">
                                <path
                                    d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                        </p>
                    @endif
                </div>


            </div>
            <div class="details-column">

                <h2 style="color: #ffc00c">Detalii Punct de Primire:</h2>
                <div>
                    @if (!empty($order->reciever_collection_points_id))
                        <p>
                            Adresa:
                            {{ !empty($order->sender_collection_points_id) ? $order->recipient->reciever_collection_point->address : 'Not Found' }}
                        </p>
                        <p>
                            Destinaţie:
                            {{ !empty($order->sender_collection_points_id) ? $order->recipient->reciever_collection_point->sides : 'Not Found' }}
                        </p>
                        <p>
                            Telefon:
                            {{ !empty($order->sender_collection_points_id) ? $order->recipient->receiver_phone : 'Not Found' }}
                        </p>
                    @else
                        <p>Veți fi contactat(ă) de unul din șoferii noștri în scurt timp pentru a confirma comanda!
                            Vă mulțumim!
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffc00c"
                                 class="bi bi-truck" viewBox="0 0 16 16">
                                <path
                                    d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                        </p>
                    @endif
                </div>

            </div>
        </div>
    </div>
    <div class="footer">
        <h5 class="thank-you-message">Vă mulțumim că ați ales Veloce Plus și vă dorim o experiență plăcută în
            continuare!</h5>
        <p>Cu respect, Echipa Veloce Plus</p>
    </div>
</div>
<!-- Include your JavaScript files and other script elements here -->
</body>

</html>
