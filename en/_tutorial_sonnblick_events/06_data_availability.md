---
title: "Data availability"
layout: doc_chapter
subheadline: "Getting an overview of the available data."
description: "Getting an overview of the available data."
teaser: "After the data has been imported into the psysmon database, its a good point to get an overview of the imported data. This helps to check if the imported amount of data fits the expected data range. This is useful to detect potentially missing data or possible fundamental problems with the data format."
image_dir: tut_sbe/data_availability

namespace: tut_sbe_data_availability

type: chapter

permalink: data_availability

figures:
    disable-collection-node:
        label: fig:disable-collection-node
        number: 1
        filename: screenshot_disable_node_in_availability_collection.png
        caption: Disable the data availability using the context menu, which is accessible by clicking the right mouse button.
        
    disabled-availability-node:
        label: fig:disabled-availability-node
        number: 2
        filename: screenshot_availability_collection_availability_disabled.png
        caption: The disabled data availability is marked with a gray text and a cross icon.
        
    inventory-statistics:
        label: fig:inventory-statistics
        number: 3
        filename: screenshot_inventory_statistics.png
        caption: The inventory statistics of the database.
        
    disabled-statistics-node:
        label: fig:disabled-statistics-node
        number: 4
        filename: screenshot_availability_collection_statistics_disabled.png
        caption: The disabled data inventory statistics node is marked with a gray text and a cross icon.
        
    availability-preferences-1:
        label: fig:availability-preferences-1
        number: 5
        filename: screenshot_availability_preferences_1.png
        caption: The data availability preferences components page.
    
    availability-preferences-2:
        label: fig:availability-preferences-2
        number: 6
        filename: screenshot_availability_preferences_2.png
        caption: The data availability preferences output page.
        
    data-availability-image:
        label: fig:data-availability-image
        number: 7
        filename: data_availability_20181025_000000_20181102_000000.png
        caption: The resulting image of the data availability collection node showing the available data of the tutorial data set.

---
## Create the availability collection
Create a collection named *availability* and add the two collection nodes `data inventory statistics` and `data availability` to the collection. Next disable the collection node `data availability`. You can disable the collection node by first selecting the node `data availability` in the collection listbox and than clicking the menu entry `disable node` from the context menu in the collection listbox.

{% include insert_image.html key="disable-collection-node" %}

The name of the disabled collection node will appear in a light gray color and the icon of the node will be changed to a cross. A disabled collection node will not be ignored when executing the collection.

{% include insert_image.html key="disabled-availability-node" %}

## Display the inventory statistics
Execute the collection with the `data availability` node disabled to open the inventory statistics dialog. This is a simple dialog showing some statistics of the database data inventory. Currently only the text view is available which shows a dictionary with the content available in the database. This overview can be used to evaluate, if the imported data has the expected content (e.g. all required recorder serials are available, the number of data files look reasonable, ...).

{% include insert_image.html key="inventory-statistics" %}

Keep the window open, we will need the information for the next step.

## Create data availability plots
### Create an output directory
The `data availability` node creates images with diagrams showing the available data of selected station components and time spans. The images are saved in a directory that has to be specified in the collection node preferences. I created an output directory named `psysmon_output/availability` in the tutorial directory. This directory will be used to save the images created by the execution of the `data availability` node.

~~~console
stefan@hausmeister:~/tutorial$ ls
dataset  psysmon  psysmon_projects  venv
stefan@hausmeister:~/tutorial$ mkdir psysmon_output
stefan@hausmeister:~/tutorial$ cd psysmon_output
stefan@hausmeister:~/tutorial/psysmon_output$ mkdir availability
stefan@hausmeister:~/tutorial/psysmon_output$ cd ..
stefan@hausmeister:~/tutorial$ tree -L 1
.
├── dataset
├── psysmon
├── psysmon_output
├── psysmon_projects
└── venv

5 directories, 0 files
stefan@hausmeister:~/tutorial$ tree psysmon_output
psysmon_output
└── availability

1 directory, 0 files
stefan@hausmeister:~/tutorial$ 
~~~

### Enable the data availability collection node
Enable the `data availability` node and disable the `data inventory statistics` node using the context menus.
Afterwards execute the collection node by clicking the `execute button. 

{% include insert_image.html key="disabled-statistics-node" %}

### Edit the collection node preferences
Before executing the collection, the preferences of the `data availability` collection node have to be set. Open the collection node preferences by selecting the `data availability` node and clicking the menu entry `edit node` in the context menu. The preferences dialog of the selected collection node will open. Select all stations and channels to process and set the process timespan according to the limits given in the `data inventory statistics` dialog. The start time is *2018-10-25T00:00:00* and the end time is *2019-11-02T00:00:00*. Set the `window mode` to `whole`.

The `window mode` preference can be used to specify the timespan into which the whole timespan should be split. For each time window (e.g. daily, weekly,...) an individual availability image will be created. The range of the tutorial dataset is not long, so we will plot the data availability of the complete time span.

The output directory `/home/stefan/tutorial/psysmon_output` can be set in the `output` page of the preferences dialog (change the filepath to fit the output path on your filesystem). The list of available pages is given in the listbox at the left side of the preferences dialog.

You can close the `data inventory statistics` dialog after now, it was useful to select the limits of the data availability timespan.

The settings in the preferences manager should look like in the following two screenshots. Confirm the settings and close the preferences dialog by clicking the `OK` button.

{% include insert_image.html key="availability-preferences-1" %}

{% include insert_image.html key="availability-preferences-2" %}


### Execute the collection

After the execution of the collection was started, no dialog window will appear. The `data availability` node only creates images in the specified output directory. You can check the status of the process in the `processes` tab of the `log area` in the psysmon main window.

Don't forget to save the project.

### Checking the availability plots
The results of a collection node will allways be placed in a unique folder named using the uniform resource identifier of the collection and the timestamp of the execution. This prevents that results are overwritten when executing the collection subsequently (e.g. with changed preferences).

The following listing shows the data structure created when executing the above collection. 

~~~console
stefan@hausmeister:~/tutorial/psysmon_output$ tree -L 3
.
└── availability
    └── smi-mr.sm-psysmon-tutorial-availability_20220803_175105_997754-data_availability
        └── data_availability_20181025_000000_20181102_000000.png

2 directories, 1 file
stefan@hausmeister:~/tutorial/psysmon_output$ 
~~~

The resulting image `data_availability_20181025_000000_20181102_000000.png` shows the available data of the tutorial data set. Black lines mark the time when data is available in the database, broad orange-red lines mark time ranges when no data is available. It can be seen, that station PIL:DPZ:XX:A has no data for the complete time span and array MOR has some short data gaps from 2018-10-30 on.

{% include insert_image.html key="data-availability-image" %}





