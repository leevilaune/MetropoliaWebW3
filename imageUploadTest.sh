curl -X POST http://localhost:3000/api/v1/cat \
-F "cat_id=43" \
-F "cat_name=garfield" \
-F "birthdate=2019-11-02" \
-F "weight=4.2" \
-F "owner=37" \
-F "file=@/Users/leevilaune/metropolia_webdev/MetropoliaWebW3/public/garfield.png;type=image/png"

