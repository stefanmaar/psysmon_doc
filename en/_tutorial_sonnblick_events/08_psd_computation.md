---
title: "Power Spectral Density"
layout: doc_chapter
subheadline: "Computation of the power spectral density."
description: "Computation of the power spectral density."
teaser: "Long term spectrograms are useful to evaluate the data quality and periods of special interest. psysmon provides the tools to compute the power spectral density (PSD) for the complete data set which then can be used to create spectrograms for the desired time spans."
image_dir: tut_sbe/psd_computation

namespace: tut_sbe_psd_computation

type: chapter

permalink: psd_computation

figures:
    create-psd-collection:
        label: fig:create-psd-collection
        number: 1
        filename: screenshot_create_psd_collection.png
        caption: The psd collection with the time window looper node and the compute psd looper children node.
        
    looper-component-preferences:
        label: fig:looper-component-preferences
        number: 2
        filename: screenshot_looper_component_preferences.png
        caption: The component preferences of the time window looper collection node.
        
    looper-output-preferences:
        label: fig:looper-output-preferences
        number: 3
        filename: screenshot_looper_output_preferences.png
        caption: The output preferences of the time window looper collection node.
        
    open-child-preferences:
        label: fig:open-child-preferences
        number: 4
        filename: screenshot_open_child_preferences.png
        caption: Open the preferences dialog of the time window looper child node using the context menu.
        
    select-processing-node:
        label: fig:select-processing-node
        number: 5
        filename: screenshot_select_processing_stack_node.png
        caption: Select the convert to sensor units processing node.
        
    ps-with-convert-node:
        label: fig:ps-with-convert-node
        number: 6
        filename: screenshot_ps_convert_sensor_units_added.png
        caption: The convert to sensor units processing node added to the processing stack.
        
    compute-psd-preferences:
        label: fig:compute-psd-preferences
        number: 7
        filename: screenshot_compute_psd_preferences.png
        caption: Set the preferences of the compute PSD looper child node.
        
    check-log-file:
        label: fig:check-log-file
        number: 8
        filename: screenshot_check_log_file.png
        caption: Get the log filename from the currently running process in the log area.
        
---
Psysmon provides so-called *looper collection nodes* that allow the creation of iterative execution of the *looper child* nodes. Currently the `time window looper` and the `event looper` are available. For the task to compute the power spectral density (PSD) for the whole data set we will use the `time window looper` which enables the processing of sliding time windows.

The aim of the PSD computation is to create long-term spectrogram images of the complete data set. Therefore we will first compute the PSD for 15 minute long time windows with an overlap of 50 % and then use these PSDs to create the spectrogram images for the desired timespan.

## Create the output directory
We will save the PSD data in a dedicated output directory for later use. Create the directory `psd_data` in the `psysmon_output` folder of the tutorial directory structure.

~~~console
stefan@hausmeister:~/tutorial$ cd psysmon_output/
stefan@hausmeister:~/tutorial/psysmon_output$ mkdir psd_data
stefan@hausmeister:~/tutorial/psysmon_output$ tree -L 1
.
├── availability
└── psd_data

2 directories, 0 files
stefan@hausmeister:~/tutorial/psysmon_output$ 
~~~


## Create the psd collection
Create a collection named *psd* and add the collection node `time window looper` to the collection. Then select the `time window looper` node in the collection listbox and add the `processing stack` and then the `compute PSD` looper collection node. Both of these nodes are `looper children` and will be added to the time window looper as sub-nodes.

The time window looper splits the specified time range into time windows and for each time window, the child nodes of the looper are executed.

{% include insert_image.html key="create-psd-collection" %}


## Configure the time window looper
As we have defined above, we aim for sliding time windows with a length of 900 seconds and an overlap of 50 %. We will set the time window looper preferences accordingly. To keep the execution fast, we will select only the components MIT:XX:A:DPZ and MOR:XX:A:DPZ.

Set the following preferences in the `components` panel:

stations
: MIT:XX:AA, MOR:XX:AA

channels
: DPZ

start time
: 2018-10-25T00:00:00

end time
: 2018-11-02T00:00:00

window mode
: free

window length
: 900

window overlap
: 50

{% include insert_image.html key="looper-component-preferences" %}


Set the following preferences in the `output` panel:

output directory
: The `tutorial/psysmon_output/psd_data` directory on your filesystem.

{% include insert_image.html key="looper-output-preferences" %}

Keep the default values of the `processing` panel.

## Configure the processing stack child node
Select the `processing stack` node in the sub-tree of the time window looper and open the preferences editor using the context menu.

{% include insert_image.html key="open-child-preferences" %}

The preferences dialog of the `processing stack` child node will open.

The `processing stack` is the same as the one that we already encountered in the tracedisplay when screening the seismic data. Add the `convert to sensor units` processing node to the processing stack using the `add` button and selecting the node from the opening dialog.

{% include insert_image.html key="select-processing-node" %}

The processing node will be added to the processing stack in the preferences dialog.

{% include insert_image.html key="ps-with-convert-node" %}

The `convert to sensor units` will convert the counts of the digital seismogram to the sensor input unit of the sensor specified in the geometry file. For the sensors used in the tutorial data set these unit is velocity (m/s). The conversion is done using the preamplification and bitweight of the data recorder and the sensitivity of the sensor. The effects of the transfer function of the sensor are not removed.

The conversion from counts to sensor units is important to relate the computed PSD data to the global noise models when creating the spectrogram images.


## Configure the compute PSD child node
Select the `compute PSD` node in the collection node and open the preferences editor using the context menu.



The preferences dialog of the `compute PSD` child node will open. 

The `compute PSD` node uses the [matplotlib.mlab.psd][mlab-psd]{:target="blank"} function of matplotlib to compute the PSD data. It uses the Welch's average periodogram method to compute the PSD for a long time series. The vector of data points passed to the psd function is divided into segments with a lenght of `nfft` samples. An overlap can be specified for the segments. You can check the source code of the `compute PSD` node in the [psysmon github repository][psysmon-github]{:target="blank"} for more details about the computation.

We will use the default values for this node. The `nfft` value sets the number of spectral points used for the Fast Fourier Transform and the `fft overlap` gives to overlap of these segments used in the Welch's average periodogram method. The `nfft` length and the `fft overlap` is not related to the time window length and overlap of the time window looper. For our example the PSD will be computed for each 900 seconds long time window which the time window looper passes to the `compute PSD` node. 

Check the values and make shure that the values are the following:

nfft
: 8192

fft overlap [%]
: 50

{% include insert_image.html key="compute-psd-preferences" %}


Confirm the preferences by clicking the `OK` button.


## Start the computation
To start the computation of the PSD data, execute the collection by clicking the `Execute` Button. A new process will be started, but no dialog window will be opened. You can check the execution of the psd collection using the log file of the process.

The collection will create a directory structure in the output directory of the `time window looper` where the PSD data is saved as Python [shelve][python-shelve]{:target="blank"} files.

## Tracking a process using the log file
You can track an collection execution process using the Linux tail command. First, get the filename of the log file of the process that you want to check. It is built using the name of the process with the `.log` file suffix. In the screenshot given below, the running process has the name `psd_20220808_152407_255098`, so the related log file can be found in the directory `psysmon_projects/tutorial/log` of your tutorial directory structure. Use the `-f` flag of the tail command to follow the updates of the log file.

{% include insert_image.html key="check-log-file" %}

~~~console
stefan@hausmeister:~/tutorial/psysmon_projects/tutorial/log$ tail -f psd_20220809_134207_310452.log 
#LOG# - 2022-08-09 13:44:44,457 - INFO - psysmon.packages.core_looper.time_window_looper.SlidingWindowProcessor: Processing sliding window 1117/1536.
#LOG# - 2022-08-09 13:44:44,458 - INFO - psysmon.packages.core_looper.time_window_looper.SlidingWindowProcessor: Initial stream request for time-span: 2018-10-30T19:30:00 to 2018-10-30T19:45:00 for scnl: [('MIT', 'DPZ', 'XX', 'A'), ('MOR', 'DPZ', 'XX', 'A')].
#LOG# - 2022-08-09 13:44:44,487 - INFO - psysmon.packages.frequency.compute_psd.ComputePsdNode: ###Processing trace with id XX.MIT.A.DPZ.
#LOG# - 2022-08-09 13:44:44,505 - INFO - psysmon.packages.frequency.compute_psd.ComputePsdNode: ###Processing trace with id XX.MOR.A.DPZ.
#LOG# - 2022-08-09 13:44:44,523 - INFO - psysmon.packages.core_looper.time_window_looper.SlidingWindowProcessor: Processing sliding window 1118/1536.
#LOG# - 2022-08-09 13:44:44,523 - INFO - psysmon.packages.core_looper.time_window_looper.SlidingWindowProcessor: Initial stream request for time-span: 2018-10-30T19:37:30 to 2018-10-30T19:52:30 for scnl: [('MIT', 'DPZ', 'XX', 'A'), ('MOR', 'DPZ', 'XX', 'A')].
#LOG# - 2022-08-09 13:44:44,551 - INFO - psysmon.packages.frequency.compute_psd.ComputePsdNode: ###Processing trace with id XX.MIT.A.DPZ.
^C
stefan@hausmeister:~/tutorial/psysmon_projects/tutorial/log$ 
~~~

## The PSD output data
The psd collection will save the computation results in a directory structure within the output directory specified in the `time window looper` node. The data is saved in hourly files organized in daily directories for each selected component. These data files will be used as an input for the computation of the long-term spectrogram images.

~~~console
stefan@hausmeister:~/tutorial/psysmon_output/psd_data/smi-mr.sm-psysmon-tutorial-psd_20220809_134207_310452-time_window_looper$ tree -L 2 psd
psd
├── MIT
│   └── DPZ
└── MOR
    └── DPZ

4 directories, 0 files
stefan@hausmeister:~/tutorial/psysmon_output/psd_data/smi-mr.sm-psysmon-tutorial-psd_20220809_134207_310452-time_window_looper$ tree -L 1 psd/MIT/DPZ
psd/MIT/DPZ
├── 2018_298
├── 2018_299
├── 2018_300
├── 2018_301
├── 2018_302
├── 2018_303
├── 2018_304
└── 2018_305

8 directories, 0 files
stefan@hausmeister:~/tutorial/psysmon_output/psd_data/smi-mr.sm-psysmon-tutorial-psd_20220809_134207_310452-time_window_looper$ tree -L 1 psd/MIT/DPZ/2018_298
psd/MIT/DPZ/2018_298
├── psd_20181025T000000_20181025T005230_MIT_DPZ_XX_A.db
├── psd_20181025T010000_20181025T015230_MIT_DPZ_XX_A.db
├── psd_20181025T020000_20181025T025230_MIT_DPZ_XX_A.db
├── psd_20181025T030000_20181025T035230_MIT_DPZ_XX_A.db
├── psd_20181025T040000_20181025T045230_MIT_DPZ_XX_A.db
├── psd_20181025T050000_20181025T055230_MIT_DPZ_XX_A.db
├── psd_20181025T060000_20181025T065230_MIT_DPZ_XX_A.db
├── psd_20181025T070000_20181025T075230_MIT_DPZ_XX_A.db
├── psd_20181025T080000_20181025T085230_MIT_DPZ_XX_A.db
├── psd_20181025T090000_20181025T095230_MIT_DPZ_XX_A.db
├── psd_20181025T100000_20181025T105230_MIT_DPZ_XX_A.db
├── psd_20181025T110000_20181025T115230_MIT_DPZ_XX_A.db
├── psd_20181025T120000_20181025T125230_MIT_DPZ_XX_A.db
├── psd_20181025T130000_20181025T135230_MIT_DPZ_XX_A.db
├── psd_20181025T140000_20181025T145230_MIT_DPZ_XX_A.db
├── psd_20181025T150000_20181025T155230_MIT_DPZ_XX_A.db
├── psd_20181025T160000_20181025T165230_MIT_DPZ_XX_A.db
├── psd_20181025T170000_20181025T175230_MIT_DPZ_XX_A.db
├── psd_20181025T180000_20181025T185230_MIT_DPZ_XX_A.db
├── psd_20181025T190000_20181025T195230_MIT_DPZ_XX_A.db
├── psd_20181025T200000_20181025T205230_MIT_DPZ_XX_A.db
├── psd_20181025T210000_20181025T215230_MIT_DPZ_XX_A.db
├── psd_20181025T220000_20181025T225230_MIT_DPZ_XX_A.db
└── psd_20181025T230000_20181025T235230_MIT_DPZ_XX_A.db

0 directories, 24 files
stefan@hausmeister:~/tutorial/psysmon_output/psd_data/smi-mr.sm-psysmon-tutorial-psd_20220809_134207_310452-time_window_looper$ 
~~~



[mlab-psd]: https://matplotlib.org/stable/api/mlab_api.html#matplotlib.mlab.psd
[psysmon-github]: https://github.com/stefanmaar/psysmon/blob/5aa3bd911d2cf5d40811a9317ecaf716117bffea/lib/psysmon/packages/frequency/compute_psd.py#L101
[python-shelve]: https://docs.python.org/3/library/shelve.html
