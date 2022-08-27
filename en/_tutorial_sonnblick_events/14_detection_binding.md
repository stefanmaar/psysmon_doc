---
title: "Detection binding"
layout: doc_chapter
subheadline: "Combining single trace detections to seismic events."
description: "Combining single trace detections to seismic events."
teaser: "The result of a STA/LTA detection run are signals detected on single traces related to the channel of a seismic station. Detection binding combines these single trace detections to events using temporal and spatial constraints."
image_dir: tut_sbe/detection_binding

namespace: tut_sbe_detection_binding

type: chapter

permalink: detection_binding/

figures:
    catalogs-collection:
        label: fig:catalog-collection
        number: 1
        filename: screenshot_catalogs_collection.png
        caption: The catalogs collection with the disabled edit detection catalogs node and the active edit event catalogs node.
        
    add-catalog:
        label: fig:add-catalog
        number: 2
        filename: screenshot_add_catalog.png
        caption: Add the tutorial event catalog using the edit event catalogs dialog.
        
    bind-collection:
        label: fig:bind-collection
        number: 3
        filename: screenshot_bind_collection.png
        caption: The detection binding collection.
        
    looper-prefs-components:
        label: fig:looper-prefs-components
        number: 4
        filename: screenshot_looper_prefs_components.png
        caption: The components preferences of the time window looper.
      
    looper-prefs-output:
        label: fig:looper-prefs-output
        number: 5
        filename: screenshot_looper_prefs_output.png
        caption: The output preferences of the time window looper.
        
    looper-prefs-processing:
        label: fig:looper-prefs-processing
        number: 6
        filename: screenshot_looper_prefs_processing.png
        caption: The processing preferences of the time window looper.
        
    binding-preferences:
        label: fig:binding-preferences
        number: 7
        filename: screenshot_binding_preferences.png
        caption: The preferences of the detection binding looper child node.
    
---
The STA/LTA detection is a single trace process which results in a series of detections associated with a single trace of a station. Usually, the seismic network should be designed, that the seismic events of interest are recorded at multiple stations to enable a localization of the event source. For the detection binding this assumption is used to bind multiple detections occurring at a similar time and on neighboring stations to an event. So an event in psysmon exists of multiple detections.

The events resulting from the detection binding are stored in the database.

## Database event tables
The database tables relevant for the detection binding are PREFIX_event_catalog, PREFIX_event and PREFIX_detection_to_event (replace PREFIX with the project name, e.g. tutorial).

~~~console
stefan@hausmeister:~$ mycli -u tutorial
/usr/lib/python3/dist-packages/paramiko/transport.py:219: CryptographyDeprecationWarning: Blowfish has been deprecated
  "class": algorithms.Blowfish,
Connecting to socket /var/run/mysqld/mysqld.sock, owned by user mysql
Password: 
MariaDB 10.3.34
mycli 1.25.0
Home: http://mycli.net
Bug tracker: https://github.com/dbcli/mycli/issues
Thanks to the contributor - zer09
MariaDB tutorial@(none):(none)> use psysmon_tutorial;
You are now connected to database "psysmon_tutorial" as user "tutorial"
Time: 0.001s
MariaDB tutorial@(none):psysmon_tutorial> describe tutorial_event_catalog;
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| id            | int(11)      | NO   | PRI | <null>  | auto_increment |
| name          | varchar(191) | NO   | UNI | <null>  |                |
| description   | text         | YES  |     | <null>  |                |
| agency_uri    | varchar(255) | YES  |     | <null>  |                |
| author_uri    | varchar(255) | YES  |     | <null>  |                |
| creation_time | varchar(30)  | YES  |     | <null>  |                |
+---------------+--------------+------+-----+---------+----------------+
6 rows in set
Time: 0.056s
MariaDB tutorial@(none):psysmon_tutorial> describe tutorial_event;
+-------------------+--------------+------+-----+---------+----------------+
| Field             | Type         | Null | Key | Default | Extra          |
+-------------------+--------------+------+-----+---------+----------------+
| id                | int(11)      | NO   | PRI | <null>  | auto_increment |
| ev_catalog_id     | int(11)      | YES  | MUL | <null>  |                |
| start_time        | double       | NO   |     | <null>  |                |
| end_time          | double       | NO   |     | <null>  |                |
| public_id         | varchar(255) | YES  |     | <null>  |                |
| description       | text         | YES  |     | <null>  |                |
| comment           | text         | YES  |     | <null>  |                |
| tags              | varchar(255) | YES  |     | <null>  |                |
| ev_type_id        | int(11)      | YES  | MUL | <null>  |                |
| ev_type_certainty | varchar(50)  | YES  |     | <null>  |                |
| pref_origin_id    | int(11)      | YES  |     | <null>  |                |
| pref_magnitude_id | int(11)      | YES  |     | <null>  |                |
| pref_focmec_id    | int(11)      | YES  |     | <null>  |                |
| agency_uri        | varchar(255) | YES  |     | <null>  |                |
| author_uri        | varchar(255) | YES  |     | <null>  |                |
| creation_time     | varchar(30)  | YES  |     | <null>  |                |
+-------------------+--------------+------+-----+---------+----------------+
16 rows in set
Time: 0.025s
MariaDB tutorial@(none):psysmon_tutorial> describe tutorial_detection_to_event;
+--------+---------+------+-----+---------+-------+
| Field  | Type    | Null | Key | Default | Extra |
+--------+---------+------+-----+---------+-------+
| ev_id  | int(11) | NO   | PRI | <null>  |       |
| det_id | int(11) | NO   | PRI | <null>  |       |
+--------+---------+------+-----+---------+-------+
2 rows in set
Time: 0.019s
MariaDB tutorial@(none):psysmon_tutorial> exit
Goodbye!
stefan@hausmeister:~$ 
~~~

## Adding an event catalog
For the event binding process, first an event catalog has to be created and then the detection binding will be done using the time window looper. The detections created in the [STA/LTA detection chapter][chap-stalta-detection] are needed for this step.

Open the 'catalogs' collection and disable the `edit detection catalogs` node in the collection. Then add the collection node `edit event catalogs` to the collection.

{% include insert_image.html key="catalogs-collection" %}

Execute the collection to open the edit event catalogs dialog. Use the `add catalog` button to add a new catalog. Set the following values for name and description:

| parameter   | value                    |
|-------------|--------------------------|
| name        | tutorial                 |
| description | The tutorial events. |

{% include insert_image.html key="add-catalog" %}

Close the dialog window.


# Create the bind collection
Create a new collection named 'bind'. Add the 'time window looper' collection node to the collection. Then add the `Detection binder` looper child node to the time window looper.

## Configure the time window looper
Open the `time window looper` preferences and set the preferences for the binding of the whole data set. 

### components
Select the time range of the whole data set and the stations MIT, MOR, PIL and STO. For each array select only one location, only for PIL select the location B, because location A was not operating. Select the DPZ channel for the detection. Use the `daily` window mode.

Set the following parameters for the `components` parameters

| parameter      | value                                   |
|----------------|-----------------------------------------|
| stations       | MIT:XX:A, MOR:XX:A, PIL:XX:B, STO:XX:00 |
| channels       | DPZ                                     |
| start time     | 2018-10-25T00:00:00                     |
| end time       | 2018-11-02T00:00:00                     |
| window mode    | daily                                   |
| window length  | not active                              |
| window overlap | not active                              |

{% include insert_image.html key="looper-prefs-components" %}

### output
The results of the detection binding are saved in the database, no output directory is needed.

{% include insert_image.html key="looper-prefs-output" %}

### processing
Leave the `use chunked processing` checkbox unchecked.

{% include insert_image.html key="looper-prefs-processing" %}


## Configure the detection binding
The detection binding searches the detections sorted by their start time. For every first item in the list, other detections with a start time within a given time window relative to the start time of the first detection are combined to an event. The search window is computed using the inter-station distances and a constant velocity. 

Another constraint that is checked, is that detecitons of a common event cluster around neighboring stations.


| parameter              | value    |
|------------------------|----------|
| detection catalog      | tutorial |
| event catalog          | tutorial |
| min. detection length  | 1.0      |
| neighbors to search    | 2        |
| match neighbors        | 1        |
| search window velocity | 300      |
| search window extent   | 1.0      |

{% include insert_image.html key="binding-preferences" %}

### Parameter description

detection catalog
: The database detection catalog holding the detections used for the detection binding.

event catalog
: The database event catalog to which the events are written.

min. detection length
: Skip detections with a length smaller than the min. detection length [s].

neighbors to search
: The number of neighbors to search for a matching detections to declare a valid event. The neighbors are sorted by the inter-station distance to the station of the investigated detection.

match neighbors
: The number of matching detections on neighboring stations to declare an event.

search window velocity
: The velocity used to compute the search window length [m/s].

search window extend
: Constant value used to extend the computed search windows [s].


## Start the detection binding
Execute the collection using the `Execute` button. The detection binding process is started and the created events are written to the database table `tutorial_event`. Check the process status in the `processes` tab of the `log area`. You can check the log file to follow the process execution.

Wait until the detection binding process has finished. It took about 8 seconds on my system.

## Check the database tables
Again use a MySQL client to check the data added to the database.

In the commands below I'm first selecting the `psysmon_tutorial` database. Then I'm setting the time_zone to UTC to make sure, that the `from_unixtime` command, that I'm using to convert the start_time timestamp, outputs the UTC time string. Next I'm showing the content of the event_catalog, and then I'm displaying the last 10 entries in the events table (sorted by the start time in descending order).

Finally I'm checking if the earthquake, that was used for the [interactive determination of the detection parameters][chap-stalta-interactive], was detected. The earthquake first onsets were recorded at ca. 2018-10-25T22:57:31. So we can expect an event around that time, and it is indeed listed in the event table.

~~~console
stefan@hausmeister:~$ mycli -u tutorial
/usr/lib/python3/dist-packages/paramiko/transport.py:219: CryptographyDeprecationWarning: Blowfish has been deprecated
  "class": algorithms.Blowfish,
Connecting to socket /var/run/mysqld/mysqld.sock, owned by user mysql
Password: 
MariaDB 10.3.34
mycli 1.25.0
Home: http://mycli.net
Bug tracker: https://github.com/dbcli/mycli/issues
Thanks to the contributor - Huachao Mao
MariaDB tutorial@(none):(none)> use psysmon_tutorial;
You are now connected to database "psysmon_tutorial" as user "tutorial"
Time: 0.001s
MariaDB tutorial@(none):psysmon_tutorial> set time_zone='+00:00';
Query OK, 0 rows affected
Time: 0.001s
MariaDB tutorial@(none):psysmon_tutorial> select * from tutorial_event_catalog;
+----+----------+----------------------+------------+------------+----------------------------+
| id | name     | description          | agency_uri | author_uri | creation_time              |
+----+----------+----------------------+------------+------------+----------------------------+
| 1  | tutorial | The tutorial events. | mr         | sm         | 2022-08-12T13:26:21.220788 |
+----+----------+----------------------+------------+------------+----------------------------+
1 row in set
Time: 0.023s
MariaDB tutorial@(none):psysmon_tutorial> select id, start_time, from_unixtime(start_time) from tutorial_event where ev_catalog_id = 1 order by start_time desc limit 10;
+-----+------------------+----------------------------+
| id  | start_time       | from_unixtime(start_time)  |
+-----+------------------+----------------------------+
| 481 | 1541115541.6725  | 2018-11-01 23:39:01.672500 |
| 480 | 1541115173.56    | 2018-11-01 23:32:53.560000 |
| 479 | 1541114909.95875 | 2018-11-01 23:28:29.958750 |
| 478 | 1541114103.02875 | 2018-11-01 23:15:03.028750 |
| 477 | 1541113691.73    | 2018-11-01 23:08:11.730000 |
| 476 | 1541113293.23375 | 2018-11-01 23:01:33.233750 |
| 475 | 1541113284.4325  | 2018-11-01 23:01:24.432500 |
| 474 | 1541111286.18125 | 2018-11-01 22:28:06.181250 |
| 473 | 1541111154.14875 | 2018-11-01 22:25:54.148750 |
| 472 | 1541109668.45875 | 2018-11-01 22:01:08.458750 |
+-----+------------------+----------------------------+
10 rows in set
Time: 0.013s
MariaDB tutorial@(none):psysmon_tutorial> select id, start_time, from_unixtime(start_time) from tutorial_event where ev_catalog_id = 1 and from_unixtime(start_time) >= "2018-10-25 22:55:00" limit 10;
+----+--------------------+----------------------------+
| id | start_time         | from_unixtime(start_time)  |
+----+--------------------+----------------------------+
| 32 | 1540508251.9387498 | 2018-10-25 22:57:31.938749 |
| 33 | 1540508601.58875   | 2018-10-25 23:03:21.588750 |
| 34 | 1540508612.52875   | 2018-10-25 23:03:32.528750 |
| 35 | 1540508697.0175    | 2018-10-25 23:04:57.017500 |
| 36 | 1540508710.1787498 | 2018-10-25 23:05:10.178749 |
| 37 | 1540508716.8899999 | 2018-10-25 23:05:16.889999 |
| 38 | 1540508760.5975    | 2018-10-25 23:06:00.597500 |
| 39 | 1540508763.5475    | 2018-10-25 23:06:03.547500 |
| 40 | 1540508778.22875   | 2018-10-25 23:06:18.228750 |
| 41 | 1540508808.5674999 | 2018-10-25 23:06:48.567499 |
+----+--------------------+----------------------------+
10 rows in set
Time: 0.013s
MariaDB tutorial@(none):psysmon_tutorial> exit
Goodbye!
stefan@hausmeister:~$ 
~~~



[chap-stalta-interactive]: {% link en/_tutorial_sonnblick_events/12_interactive_sta_lta_parameter_determination.md %}#performance-with-earthquke-signal
[chap-stalta-detection]: {% link en/_tutorial_sonnblick_events/13_run_sta_lta_detection.md %}
