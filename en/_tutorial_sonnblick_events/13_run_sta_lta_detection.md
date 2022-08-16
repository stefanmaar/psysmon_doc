---
title: "STA/LTA detection"
layout: doc_chapter
subheadline: "Running the detection for the whole data set."
description: "Running the detection for the whole data set."
teaser: "The STA/LTA parameters determined interactively can be used to run the detection on the whole data set. The resulting detections are stored in the database."
image_dir: tut_sbe/sta_lta_detection

namespace: tut_sbe_sta_lta_detection

type: chapter

permalink: sta_lta_detection/

figures:
    catalogs-collection:
        label: fig:catalog-collection
        number: 1
        filename: screenshot_catalogs_collection.png
        caption: The catalogs collection.
        
    add-catalog:
        label: fig:add-catalog
        number: 2
        filename: screenshot_add_catalog.png
        caption: Add the tutorial detection catalog using the edit detection catalogs dialog.
        
    detect-collection:
        label: fig:detect-collection
        number: 3
        filename: screenshot_detect_collection.png
        caption: The detect collection with the time window looper and the two children nodes processing stack and STA/LTA detection.
        
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
        
    ps-preferences:
        label: fig:ps-preferences
        number: 7
        filename: screenshot_processing_stack_preferences.png
        caption: The configured processing stack.
        
    stalta-preferences:
        label: fig:stalta-preferences
        number: 8
        filename: screenshot_stalta_preferences.png
        caption: The preferences of the STA/LTA detection.
        
    stalta-output:
        label: fig:stalta-output
        number: 9
        filename: screenshot_stalta_output.png
        caption: The output preferences of the STA/LTA detection.
        
    check-process:
        label: fig:check-process
        number: 10
        filename: screenshot_check_process.png
        caption: Checking the process execution status in the log area. The detect process has stopped, it took 05:10 minutes to finish. 
---
In the chapter before, we have determined the STA/LTA detection parameters that fit our needs. We will now use the time window looper to perform the signal detection for the whole data set. The metadata of the detected signals (e.g. start time, end time, related stream) are saved in the database. A detection catalog holds a set of detections.

For the detection process we will first create a detection table, that is used to store the signal detections. Next we will create a collection holding a time window looper to do the signal detection.

## Database detection tables
Its always good to know where the data is stored. Sometimes it is handy to directly access the data in the database to check for errors or manually change some data. The relevant database tables are the PREFIX_detection_catalog and PREFIX_detection tables (replace PREFIX with the project name, e.g. tutorial_detection_catalog, tutorial_detection for the tutorial database).

~~~console
stefan@hausmeister:~$ mysql -u tutorial -p
Enter password: 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 41
Server version: 10.3.34-MariaDB-0ubuntu0.20.04.1 Ubuntu 20.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> use psysmon_tutorial;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [psysmon_tutorial]> describe tutorial_detection_catalog;
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| id            | int(11)      | NO   | PRI | NULL    | auto_increment |
| name          | varchar(191) | NO   | UNI | NULL    |                |
| description   | text         | YES  |     | NULL    |                |
| agency_uri    | varchar(255) | YES  |     | NULL    |                |
| author_uri    | varchar(255) | YES  |     | NULL    |                |
| creation_time | varchar(30)  | YES  |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+
6 rows in set (0.001 sec)

MariaDB [psysmon_tutorial]> describe tutorial_detection;
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| id            | int(11)      | NO   | PRI | NULL    | auto_increment |
| catalog_id    | int(11)      | YES  | MUL | NULL    |                |
| rec_stream_id | int(11)      | YES  | MUL | NULL    |                |
| start_time    | double       | NO   |     | NULL    |                |
| end_time      | double       | NO   |     | NULL    |                |
| method        | varchar(255) | YES  |     | NULL    |                |
| agency_uri    | varchar(255) | YES  |     | NULL    |                |
| author_uri    | varchar(255) | YES  |     | NULL    |                |
| creation_time | varchar(30)  | YES  |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+
9 rows in set (0.001 sec)

MariaDB [psysmon_tutorial]> exit
Bye
stefan@hausmeister:~$ 
~~~

## Adding a detection catalog
Create a new collection named `catalogs` and add the collection node `edit detection catalogs` to the collection.

{% include insert_image.html key="catalogs-collection" %}

Execute the collection to open the edit detection catalogs dialog. Use the `add catalog` button to add a new catalog. Set the following values for name and description:

| parameter   | value                    |
|-------------|--------------------------|
| name        | tutorial                 |
| description | The tutorial detections. |

{% include insert_image.html key="add-catalog" %}

Close the dialog window.

## Create the detect collection
Next, create a new collection named `detect`. Add the `time window looper` collection node to the collection. Then add the `processing stack` and the `STA/LTA detection` looper children to the time window looper.

{% include insert_image.html key="detect-collection" %}

## Configure the time window looper
Open the `time window looper` preferences and set the preferences for the detection of the whole data set.

### components
Select the time range of the whole data set and the stations MIT, MOR, PIL and STO. For each array select only one location, only for PIL select the location B, because location A was not operating. Select the DPZ channel for the detection. Use a sliding window of length 600 seconds without any overlap. Overlapping window make no sense for the detection process.

Set the following parameters for the `components` parameters

| parameter      | value                                   |
|----------------|-----------------------------------------|
| stations       | MIT:XX:A, MOR:XX:A, PIL:XX:B, STO:XX:00 |
| channels       | DPZ                                     |
| start time     | 2018-10-25T00:00:00                     |
| end time       | 2018-11-02T00:00:00                     |
| window mode    | free                                    |
| window length  | 600                                     |
| window overlap | 0                                        |

{% include insert_image.html key="looper-prefs-components" %}

### output
The results of the detection are saved in the database, no output directory is needed.

{% include insert_image.html key="looper-prefs-output" %}

### processing
Leave the `use chunked processing` checkbox unchecked.

{% include insert_image.html key="looper-prefs-processing" %}


## Configure the processing stack
Open the `processing stack` preferences and add a 100 Hz lowpass filter.

{% include insert_image.html key="ps-preferences" %}

Close the preferences dialog.

## Configure the STA/LTA detection
Open the `STA/LTA detection` preferences. Set the values that have been determined interactively in the [previous chapter][chap-stalta-interactive].

### Preferences

| parameter            | value  |
|----------------------|--------|
| cf type              | square |
| STA length           | 1.0    |
| LTA length           | 20.0   |
| Threshold            | 5.0    |
| Fine threshold       | 2.0    |
| turn limit           | 0.05   |
| stop grow ratio      | 0.0001 |
| stop grow exponent   | 0.9    |
| stop grow increase   | 0.0001 |
| stop grow inc. begin | 200.0  |
| stop delay           | 0.1    |
| reject length        | 0.5    |

{% include insert_image.html key="stalta-preferences" %}

### Output

Select the `tutorial` detection catalog as the output.

{% include insert_image.html key="stalta-output" %}

Close the preferences window by clicking the `OK` button.


## Start the detection
Execute the collection using the `Execute` button. The detection process will be started and the detections will be written to the database table `tutorial_detection`. Check the process status in the `processes` tab of the `log area`. You can check the log file to follow the process execution.

Wait until the detection process has finished. It took about 5 minutes on my system.

{% include insert_image.html key="check-process" %}

## Check the database tables
To get used to using the database, check the results of the detection process in the database tables. For this purpose I'm using the [mycli][link-mycli] MySQL client, which has syntax highlighting and autocomplete. You can use the default mysql client if you wish, the commands stay the same.

In the commands below I'm first selecting the `psysmon_tutorial` database. Then I'm setting the time_zone to UTC to make sure, that the `from_unixtime` command, that I'm using to convert the start_time timestamp, outputs the UTC time string. Next I'm showing the content of the detetion_catalog table and then I'm displaying the last 10 entries in the detection table (sorted by start_time descending).

~~~console
stefan@hausmeister:~$ mycli -u tutorial
Connecting to socket /var/run/mysqld/mysqld.sock, owned by user mysql
Password: 
MariaDB 10.3.34
mycli 1.25.0
Home: http://mycli.net
Bug tracker: https://github.com/dbcli/mycli/issues
Thanks to the contributor - Daniel Black
MariaDB tutorial@(none):(none)> use psysmon_tutorial;
You are now connected to database "psysmon_tutorial" as user "tutorial"
Time: 0.001s
MariaDB tutorial@(none):psysmon_tutorial> set time_zone='+00:00';
Query OK, 0 rows affected
Time: 0.001s
MariaDB tutorial@(none):psysmon_tutorial> select * from tutorial_detection_catalog;
+----+----------+--------------------------+------------+------------+----------------------------+
| id | name     | description              | agency_uri | author_uri | creation_time              |
+----+----------+--------------------------+------------+------------+----------------------------+
| 1  | tutorial | The tutorial detections. | mr         | sm         | 2022-08-12T11:33:06.641258 |
+----+----------+--------------------------+------------+------------+----------------------------+
1 row in set
Time: 0.034s
MariaDB tutorial@(none):psysmon_tutorial> select id, start_time, from_unixtime(start_time), rec_stream_id from tutorial_detection where catalog_id = 1 order by start_time desc limit 10;
+-------+------------------+----------------------------+---------------+
| id    | start_time       | from_unixtime(start_time)  | rec_stream_id |
+-------+------------------+----------------------------+---------------+
| 12637 | 1541116785.37    | 2018-11-01 23:59:45.370000 | 13            |
| 12636 | 1541116782.7475  | 2018-11-01 23:59:42.747500 | 13            |
| 12635 | 1541116780.9525  | 2018-11-01 23:59:40.952500 | 13            |
| 12634 | 1541116762.74875 | 2018-11-01 23:59:22.748750 | 13            |
| 12633 | 1541116693.80875 | 2018-11-01 23:58:13.808750 | 13            |
| 12632 | 1541116662.61    | 2018-11-01 23:57:42.610000 | 13            |
| 12640 | 1541116649.33375 | 2018-11-01 23:57:29.333750 | 8             |
| 12631 | 1541116611.39625 | 2018-11-01 23:56:51.396250 | 13            |
| 12630 | 1541116578.98375 | 2018-11-01 23:56:18.983750 | 13            |
| 12629 | 1541116576.86625 | 2018-11-01 23:56:16.866250 | 13            |
+-------+------------------+----------------------------+---------------+
10 rows in set
Time: 0.034s
MariaDB tutorial@(none):psysmon_tutorial> exit
Goodbye!
stefan@hausmeister:~$ 
~~~



[chap-stalta-interactive]: {% link en/_tutorial_sonnblick_events/12_interactive_sta_lta_parameter_determination.md %}

[link-mycli]: https://github.com/dbcli/mycli


