import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:pfeflutter/models/entreprise.dart';
import 'package:pfeflutter/models/ligne.dart';
import 'package:pfeflutter/models/reservation.dart';
import 'package:pfeflutter/models/voyage.dart';
import 'package:http/http.dart' as http;
import 'package:pfeflutter/screens/fromTo.dart';
import 'package:pfeflutter/screens/lastetapereservation.dart';

class trtdata extends StatefulWidget {
  String station11, station22, test;

  trtdata({
    Key? key,
    required this.station11,
    required this.station22,
    required this.test,
  }) : super(key: key);

  @override
  _DataWidgetState createState() => _DataWidgetState();
}

class _DataWidgetState extends State<trtdata> {
  List<Ligne> data = [];
  List<Ligne> dataligne = [];
  List<Voyage> datavoyage = [];

  List<Reservation> reservation = [];
  List<Reservation> res = [];
  String distance = '';
  String prixx = '';

  List<int> idvoyagee = [];
  List<Entreprise> entreprise = [];
  List<Entreprise> entr = [];
  List<String> temps = [];
  List<String> tempslast = [];
  List<int> entrepr = [];
  List<String> entrenames = [];
  List<Entreprise> testentr = [];

  Future<List<Ligne>> fetchzData() async {
    var url = Uri.parse('http://127.0.0.1:8000/api/getallligne');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      data = jsonResponse.map((data) => Ligne.fromJson(data)).toList();
      List<Ligne> longFruits = data
          .where((fruit) =>
              fruit.arrive == widget.station11 &&
              fruit.depart == widget.station22)
          .toList();

      return longFruits;
    } else {
      throw Exception('Unexpected error occured!');
    }
  }

  Future<List<Reservation>> getvoyage() async {
    List<Ligne> ix = await fetchzData();

    distance = ix[0].distance;
    prixx = ix[0].prix;
    int lentgh = ix.length;
    var i = 0;
    for (var j = 0; j <= lentgh; j++) {
      int idd = ix[j].id;
      var url = Uri.parse('http://127.0.0.1:8000/api/voyage/$idd');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        List jsonResponse = json.decode(response.body);
        datavoyage = jsonResponse.map((data) => Voyage.fromJson(data)).toList();
        List<Voyage> hhh = datavoyage;
        datavoyage.forEach((element) {
          idvoyagee.add(element.id);
          temps.add(element.temps);
          entrepr.add(element.entrepriseId);
        });

        for (int el in idvoyagee) {
          var url = Uri.parse('http://127.0.0.1:8000/api/getrall/$el');
          final response = await http.get(url);
          if (response.statusCode == 200) {
            tempslast.add(temps[i]);
            try {
              var url =
                  Uri.parse('http://127.0.0.1:8000/api/entre/${entrepr[i]}');
              final response = await http.get(url);
              if (response.statusCode == 200) {
                List jsonResponse = json.decode(response.body);
                testentr = jsonResponse
                    .map((data) => Entreprise.fromJson(data))
                    .toList();
                String name = testentr[0].name.toString();
                entrenames.add(name);
                print(name);
              } else {
                throw Exception('Unexpected error occured!');
              }
            } catch (e) {
              print('Error: $e');
            }
            List jsonResponse = json.decode(response.body);
            res =
                jsonResponse.map((data) => Reservation.fromJson(data)).toList();
            reservation.addAll(res);
            print(tempslast);
            print(temps);
            print(idvoyagee);
            i = i + 1;
          } else {
            throw Exception('Unexpected error occured!');
          }
        }
      }
    }
    return reservation;
  }

  @override
  Widget build(BuildContext context) {
    String ss11 = widget.station11;
    String ss22 = widget.station22;

    return Scaffold(
      body: Container(
        child: Stack(children: [
          Positioned(
            top: 50,
            child: Container(
                width: 120,
                child: ElevatedButton.icon(
                  onPressed: () {
                    if (widget.test == '0') {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => Fromto(
                            test: '0',
                          ),
                        ),
                      );
                      print('Button pressed');
                    } else {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => Fromto(
                            test: widget.test,
                          ),
                        ),
                      );
                      print('Button pressed');
                    }
                  },
                  icon: Icon(Icons.ad_units), // Replace with your desired icon
                  label: Text('Previous'),
                  // Replace with your desired label
                )),
          ),
          Positioned(
            top: 100,
            left: 15,
            right: 15,
            child: Center(
              child: Container(
                child: Text(
                  'Voyages disponible De ${ss11} A ${ss22} ',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontStyle: FontStyle.italic,
                      color: Colors.black,
                      fontSize: 25),
                ),
              ),
            ),
          ),
          Positioned(
            top: 200,
            left: 0,
            right: 0,
            child: Container(
              child: FutureBuilder<List<Reservation>>(
                future: getvoyage(),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: DataTable(
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                              color: Colors.blue.withOpacity(0.4),
                              blurRadius: 10,
                              spreadRadius: 2,
                              offset: Offset(0, 4),
                            ),
                          ],
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.black),
                        ),
                        columnSpacing: 20,
                        columns: const [
                          DataColumn(
                              label: Text(
                                'Temps',
                                style: TextStyle(
                                    fontSize: 20,
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    decoration: TextDecoration.none),
                              ),
                              numeric: false),
                          DataColumn(
                              label: Text(
                                'prix',
                                style: TextStyle(
                                    fontSize: 20,
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    decoration: TextDecoration.none),
                              ),
                              numeric: false),
                          DataColumn(
                              label: Text(
                                'Entreprise',
                                style: TextStyle(
                                    fontSize: 20,
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    decoration: TextDecoration.none),
                              ),
                              numeric: true),
                          DataColumn(
                              label: Text(
                            'Action',
                            style: TextStyle(
                                fontSize: 20,
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                decoration: TextDecoration.none),
                          )),
                        ],
                        rows: List.generate(
                          snapshot.data!.length,
                          (index) {
                            var data = snapshot.data![index];
                            return DataRow(cells: [
                              DataCell(
                                Text(tempslast[index]),
                              ),
                              DataCell(
                                Text(prixx),
                              ),
                              DataCell(
                                Text(entrenames[index]),
                              ),
                              DataCell(ElevatedButton(
                                onPressed: () {
                                  // Add your button click logic here

                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => lastofus(
                                        station11: ss11.toString(),
                                        station22: ss22.toString(),
                                        res: data,
                                        distance: distance,
                                        prixx: prixx,
                                        testt: widget.test,
                                      ),
                                    ),
                                  );
                                },
                                child: Text('Reserve'),
                              ))
                            ]);
                          },
                        ).toList(),
                        showBottomBorder: true,
                      ),
                    );
                  } else if (snapshot.hasError) {
                    return Text(snapshot.error.toString());
                  }
                  // By default show a loading spinner.
                  return const CircularProgressIndicator();
                },
              ),
            ),
          ),

          /*Positioned(
            top: 300,
            left: 100,
            right: 100,
            child: Center(
              child: reservation != null
                  ? Container(
                      width: 200,
                      height: 200,
                      color: Colors.blue,
                      child: Text('Content inside the container'),
                    )
                  : Container(
                      child: Text('Content inside the container'),
                    ), // Empty container when data is null
            ),
          ),*/
        ]),
      ),
    );
  }
}
