---
title: "Characteristic parameters"
layout: doc_chapter
subheadline: "Extract features characterizing an event."
description: "Extract features characterizing an event."
teaser: "For each detected event, characteristic amplitude parameters are computed which can be used to search for similarities amoung the individual events."
image_dir: tut_sbe/characteristic_parameters

namespace: tut_sbe_characteristic_parameters

type: chapter

permalink: characteristic_parameters/

figures:
    collection-event-parameters:
        label: fig:collection-event-parameters
        number: 1
        filename: screenshot_collection_event_parameters.png
        caption: The event parameters collection with the event looper node and the compute amplitude features child node.
        
    looper-prefs-events:
        label: fig:looper-prefs-events
        number: 2
        filename: screenshot_event_looper_events.png
        caption: The event looper events preferences.
        
    looper-prefs-components:
        label: fig:looper-prefs-components
        number: 3
        filename: screenshot_event_looper_components.png
        caption: The event looper components preferences.
        
    looper-prefs-filter:
        label: fig:looper-prefs-filter
        number: 4
        filename: screenshot_event_looper_filter.png
        caption: The event looper filter preferences.
        
    looper-prefs-processing:
        label: fig:looper-prefs-processing
        number: 5
        filename: screenshot_event_looper_processing.png
        caption: The event looper processing preferences.
        
    looper-prefs-output:
        label: fig:looper-prefs-output
        number: 6
        filename: screenshot_event_looper_output.png
        caption: The event looper output preferences.
        
    amplitude-features:
        label: fig:amplitude-features
        number: 7
        filename: screenshot_amp_features.png
        caption: The compute amplitude features preferences.
---
The `compute amplitude features` looper child node can be used to compute a set of amplitude features (e.g. max amplitude, SNR). The amplitude features will be computed per time span and saved in a CSV file. When using the event looper to create the time spans passed to the looper children, one CSV file is created per event. The combination of the event features of multiple events is currently not supported. This has to be done in a custom script.

## Create the output directory
Create the `event_amp_parameters` in the tutorial directory structure.

~~~console
stefan@hausmeister:~/tutorial/psysmon_output$ mkdir event_amp_parameters
mkdir: das Verzeichnis »event_amp_parameters“ kann nicht angelegt werden: Die Datei existiert bereits
stefan@hausmeister:~/tutorial/psysmon_output$ tree -L 1
.
├── availability
├── event_amp_parameters
├── event_data
├── event_list
├── event_picks
├── ppsd
├── psd_data
└── psd_images

8 directories, 0 files
stefan@hausmeister:~/tutorial/psysmon_output$ 
~~~

## Configure the event looper

Open the `event looper` preferences and set the following preferences. We will set the preferences to export the events from 2018-10-25T22:00:00 to 2018-10-25T23:00:00 from the tutorial event catalog. The event data should be exported to the `event_amp_parameters` directory created above.

### events

| parameter                | value               |
|--------------------------|---------------------|
| start time               | 2018-10-25T22:00:00 |
| end time                 | 2018-10-26T00:00:00 |
| event catalog            | tutorial            |

{% include insert_image.html key="looper-prefs-events" %}

### components

Select the components used for the detection: MIT:XX:A:DPZ, MOR:XX:A:DPZ, PIL:XX:A:DPZ and STO:XX:00:DPZ.

{% include insert_image.html key="looper-prefs-components" %}

### filter
No filters are used. Keep the empty default values.

{% include insert_image.html key="looper-prefs-filter" %}

### processing
Select the `whole` processing interval. This loads all events of the selected timespan and then iterates them. In case of long looper time spans and a large set of events it is useful to split the time span to process into smaller intervals.

{% include insert_image.html key="looper-prefs-processing" %}

### output
Select the path to the `event_amp_parameters` directory in your tutorial directory structure.

{% include insert_image.html key="looper-prefs-output" %}

Close the `event looper` preferences dialog.

## Configure the compute amplitude features child node
Open the `compute amplitude features` child node preferences and check the `noise window length` default value is set to 5.0 seconds.

{% include insert_image.html key="amplitude-features" %}

Close the `compute amplitude features` preferences dialog.

## Compute the amplitude features
Start the computation of the amplitude features by executing the collection using the `execute` button. The event amplitude features will be saved to CSV files in the specified output directory.

~~~console
stefan@hausmeister:~/tutorial/psysmon_output$ cd event_amp_parameters
stefan@hausmeister:~/tutorial/psysmon_output/event_amp_parameters$ tree -L 5
.
└── smi-mr.sm-psysmon-tutorial-event_parameters_20220816_143502_503890-event_looper
    ├── amplitude features
    │   └── 2018
    │       └── 298
    │           ├── amplitude features_31_20181025T223705296250_20181025T223708686250.csv
    │           ├── amplitude features_32_20181025T225731938750_20181025T230230400000.csv
    │           ├── amplitude features_33_20181025T230321588750_20181025T230330566250.csv
    │           ├── amplitude features_34_20181025T230332528750_20181025T230337713750.csv
    │           ├── amplitude features_35_20181025T230457017500_20181025T230517045000.csv
    │           ├── amplitude features_36_20181025T230510178750_20181025T230520141250.csv
    │           ├── amplitude features_37_20181025T230516890000_20181025T230533206250.csv
    │           ├── amplitude features_38_20181025T230600597500_20181025T230608838750.csv
    │           ├── amplitude features_39_20181025T230603547500_20181025T230608436250.csv
    │           ├── amplitude features_40_20181025T230618228750_20181025T230622373750.csv
    │           ├── amplitude features_41_20181025T230648567500_20181025T230652330000.csv
    │           ├── amplitude features_42_20181025T230823133750_20181025T230825577500.csv
    │           ├── amplitude features_43_20181025T230826382500_20181025T230832262500.csv
    │           ├── amplitude features_44_20181025T230923367500_20181025T230926391250.csv
    │           ├── amplitude features_45_20181025T231203431250_20181025T231233201250.csv
    │           ├── amplitude features_46_20181025T231224226250_20181025T231229863750.csv
    │           ├── amplitude features_47_20181025T231405158750_20181025T231418688750.csv
    │           ├── amplitude features_48_20181025T231745996250_20181025T231749641250.csv
    │           ├── amplitude features_49_20181025T232950563750_20181025T233006408750.csv
    │           ├── amplitude features_50_20181025T233227351250_20181025T233232167500.csv
    │           ├── amplitude features_51_20181025T233431552500_20181025T233435112500.csv
    │           ├── amplitude features_52_20181025T233543186250_20181025T233545573750.csv
    │           ├── amplitude features_53_20181025T235152060000_20181025T235154977500.csv
    │           └── amplitude features_54_20181025T235812638750_20181025T235832792500.csv
    └── execution_metadata.json

4 directories, 25 files
stefan@hausmeister:~/tutorial/psysmon_output/event_amp_parameters$ 
~~~

### Event amplitude features example
The following listing gives the content of an event features CSV file.

~~~csv
scnl,event_id,win_start_time,win_end_time,max_abs,peak_to_peak,mean,std,median,snr,snr_max_mean,snr_max_max
MIT:DPZ:XX:A,32,2018-10-25T22:57:31.938750,2018-10-25T23:02:30.400000,34793.0,42823.0,12948.310642040457,3258.76936142358,12884.0,1.02,2.66,2.51
MOR:DPZ:XX:A,32,2018-10-25T22:57:31.938750,2018-10-25T23:02:30.400000,20374.0,30895.0,-4452.5758386732,2563.848358205866,-4465.0,1.12,4.43,3.89
PIL:DPZ:XX:B,32,2018-10-25T22:57:31.938750,2018-10-25T23:02:30.400000,17821.0,23153.0,-5463.461670226578,2083.784168070597,-5444.0,1.06,3.24,2.98
STO:DPZ:XX:00,32,2018-10-25T22:57:31.938750,2018-10-25T23:02:30.400000,17035.0,20825.0,-6531.606726138125,1977.020554401247,-6538.0,1.04,2.61,2.43
~~~

