<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificare Pregătire Colet - Veloce Plus</title>
    <!-- Bootstrap CSS link -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <style>
        body {
            /* background-color: #0051A8; */
            color: white;
        }

        .container {
            margin-top: 5rem;
            /* Adjusted margin-top for better visibility */
        }

        .card {
            background-color: #0051A8;
            border: none;
        }
        .card-body h5,
        .card-title {
            color: #FFC00C;
        }

        .card-text,
        .card-text b {
            color: white;
        }
    </style>
</head>

<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Notificare Pregătire Colet pentru Colectare de la Veloce Plus</h4>
                <p class="card-text">
                    Stimate Client,<br>
                    Suntem încântați să vă informăm că pachetul dumneavoastră este acum pregătit pentru colectare. Vă rugăm
                    să urmați pașii de mai jos pentru a ridica coletul:
                </p>

                <h5>Detalii Colet:</h5>
                <p>ID Unic Comandă: <b>{{$order->id}}</b></p>
                @if(!empty($order->reciever_collection_points_id))
                <p>Nume Punct de Colectare: <b>{{$order->recipient->reciever_collection_point->name}}</b></p>
                <p>Adresa: <b>{{$order->recipient->reciever_collection_point->address}}</b></p>
                @else
                <p></p>
                @endif
                <!-- <p>Oraș: [Oraș]</p>
                <p>Cod Poștal: [Cod Poștal]</p> -->

                <p>
                    Vă rugăm să vă prezentați la punctul de colectare indicat mai sus. Este necesar să aveți la
                    dumneavoastră ID-ul unic al comenzii și un act de identitate valid pentru a ridica coletul.
                </p>

                <p>
                    Vă mulțumim că ați ales Veloce Plus și vă dorim o experiență plăcută în continuare!
                </p>

                <p>
                    Cu respect,<br>
                    Echipa Veloce Plus
                </p>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS and Popper.js links (for Bootstrap modal, etc.) -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>

</html>
