---
title: "Event export"
layout: doc_chapter
subheadline: "Exporting the events and the event data."
description: "Exporting the events and the event data."
teaser: "The detected events and the associated waveform data can be exported to machine readable data files for further analyses."
image_dir: tut_sbe/event_export

namespace: tut_sbe_event_export

type: chapter

permalink: event_export

figures:
    collection-export:
        label: fig:collection-export
        number: 1
        filename: screenshot_export_collection.png
        caption: The export collection with the export events collection node.
        
    export-prefs-events:
        label: fig:export-prefs-events
        number: 2
        filename: screenshot_export_prefs_events.png
        caption: The events page of the export events preferences dialog.
        
    export-prefs-filter:
        label: fig:export-prefs-filter
        number: 3
        filename: screenshot_export_prefs_filter.png
        caption: The filter page of the export events preferences dialog.
        
    export-prefs-output:
        label: fig:export-prefs-output
        number: 4
        filename: screenshot_export_prefs_output.png
        caption: The output page of the export events preferences dialog.
    
    collection-export-looper:
        label: fig:collection-export-looper
        number: 1
        filename: screenshot_export_collection_looper.png
        caption: The export collection with the event looper and the needed child nodes.

---
The events and detections saved in the psysmon database can be exported to a CSV file for further data analysis. Additionally psysmon supports the export of the waveform data of the events.

## Create the output directories
For the event export you should create two output directories in the tutorial directory structure: `event_list` and `event_data`

~~~console
stefan@hausmeister:~/tutorial$ cd psysmon_output
stefan@hausmeister:~/tutorial/psysmon_output$ mkdir event_list
stefan@hausmeister:~/tutorial/psysmon_output$ mkdir event_data
stefan@hausmeister:~/tutorial/psysmon_output$ tree -L 1
.
├── availability
├── event_data
├── event_list
├── ppsd
├── psd_data
└── psd_images

6 directories, 0 files
stefan@hausmeister:~/tutorial/psysmon_output$ 
~~~

## Export the event list
To export the event list, first create a new collection named `export` and add the `export events` collection node.

{% include insert_image.html key="collection-export" %}

## Configure the export events node
Open the `export events` preferences dialog and edit the settings.

### event
Select the whole time span of the tutorial data set and the `tutorial` event catalog to export.

| parameter                | value               |
|--------------------------|---------------------|
| start time               | 2018-10-25T00:00:00 |
| end time                 | 2018-11-02T00:00:00 |
| event catalog            | tutorial            |
| select individual events | unchecked           |

{% include insert_image.html key="export-prefs-events" %}

### Filter
Leave the filter settings unchanged.

{% include insert_image.html key="export-prefs-filter" %}


### output
Select the `event_list` folder created above and `whole` for the output interval. The ouput interval determines the splitting of the ouput to individual files. Using `whole` will create one file for all events and detections.

{% include insert_image.html key="export-prefs-output" %}

Close the preferences dialog.


## Export the events to CSV
Click the `execute` button to run the collection. The CSV files of the event- and detecition list will be created in the specified output directory.

~~~console
stefan@hausmeister:~/tutorial/psysmon_output$ cd event_list
stefan@hausmeister:~/tutorial/psysmon_output/event_list$ tree -l 3
3 [error opening dir]

0 directories, 0 files
stefan@hausmeister:~/tutorial/psysmon_output/event_list$ tree -L 3
.
└── smi-mr.sm-psysmon-tutorial-export_20220813_180049_119650-export_events
    ├── detection
    │   └── detection_20181025T000000_20181102T000000.csv
    ├── event
    │   └── event_20181025T000000_20181102T000000.csv
    └── execution_metadata.json

3 directories, 3 files
stefan@hausmeister:~/tutorial/psysmon_output/event_list$
~~~

### Event list example
The following listing gives the first few lines of the exported event list.

~~~csv
id,event_start_time,event_end_time,n_stations,detection_scnl,detection_start,detection_end,catalog_name,event_type_id,event_type
1,2018-10-25T00:55:46.246250,2018-10-25T00:55:50.125000,2,"MIT:DPZ:XX:A,MOR:DPZ:XX:A","1540428946.24625,1540428948.20375","1540428950.125,1540428950.01125",tutorial,,
2,2018-10-25T01:17:31.106250,2018-10-25T01:17:35.220000,2,"MOR:DPZ:XX:A,PIL:DPZ:XX:B","1540430251.20375,1540430251.10625","1540430255.1,1540430255.22",tutorial,,
3,2018-10-25T03:08:11.236250,2018-10-25T03:08:14.108750,2,"MOR:DPZ:XX:A,PIL:DPZ:XX:B","1540436891.23625,1540436891.6687498","1540436894.10875,1540436893.12",tutorial,,
4,2018-10-25T03:14:03.091250,2018-10-25T03:14:05.485000,2,"MIT:DPZ:XX:A,PIL:DPZ:XX:B","1540437244.44125,1540437243.09125","1540437245.485,1540437244.74625",tutorial,,
5,2018-10-25T03:20:09.995000,2018-10-25T03:20:13.705000,2,"MOR:DPZ:XX:A,PIL:DPZ:XX:B","1540437610.19625,1540437609.995","1540437613.705,1540437613.095",tutorial,,
~~~


### Detection list example
The following listing gives the first few lines of the exported detection list.

~~~csv
id,start_time,end_time,channel,catalog,event_id,event_start_time,event_end_time
15,2018-10-25T00:55:46.246250,2018-10-25T00:55:50.125000,MIT:DPZ:XX:A,tutorial,1,2018-10-25T00:55:46.246250,2018-10-25T00:55:50.125000
19,2018-10-25T00:55:48.203750,2018-10-25T00:55:50.011250,MOR:DPZ:XX:A,tutorial,1,2018-10-25T00:55:46.246250,2018-10-25T00:55:50.125000
28,2018-10-25T01:17:31.203750,2018-10-25T01:17:35.100000,MOR:DPZ:XX:A,tutorial,2,2018-10-25T01:17:31.106250,2018-10-25T01:17:35.220000
29,2018-10-25T01:17:31.106250,2018-10-25T01:17:35.220000,PIL:DPZ:XX:B,tutorial,2,2018-10-25T01:17:31.106250,2018-10-25T01:17:35.220000
65,2018-10-25T03:08:11.236250,2018-10-25T03:08:14.108750,MOR:DPZ:XX:A,tutorial,3,2018-10-25T03:08:11.236250,2018-10-25T03:08:14.108750
66,2018-10-25T03:08:11.668750,2018-10-25T03:08:13.120000,PIL:DPZ:XX:B,tutorial,3,2018-10-25T03:08:11.236250,2018-10-25T03:08:14.108750
~~~

## Exporting the event waveform
The looper collection node `export waveform data` provides the export of data of a given timespan. The data can be exported in a format supported by obspy. Addidionally images of the waveforms will be created.

To export the event waveform data the `event looper` is used. This looper iterates through a list of events specified in the preferences. The `processing stack` child node is added to detrend the data before exporting it using the `export waveform data` child node.

## Add the event looper
Disable the `export events` node in the export collection and at the `event looper` and the child nodes `processing stack` and `export waveform data`.

{% include insert_image.html key="collection-export-looper" %}

## Configure the event looper
