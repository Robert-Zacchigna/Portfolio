---
layout: post
title: Predict Graduation Rates (2019 U.S. College Data)
tags: Jupyter Notebook, R, ggplot, College/University, Models
category: Machine Learning, ML, Regression
summary: Explores how various university factors (Economic, Academic, Enrollment, Faculty, etc...) can predict a university's student graduation rate.
---

# Overview

This analysis creates and compares several different models created to try and predict a colleges' graduation rate given 
a variety of variables that could affect students, like: Economic, Academic, Enrollment, Faculty, etc... A comparison 
of [linear regression](https://machinelearningmastery.com/linear-regression-for-machine-learning/){:target="_blank"} 
models was done using significant variables from the dataset to narrow down the relevant variables. From there other types 
of models were created for further comparison: [random forest](https://en.wikipedia.org/wiki/Random_forest){:target="_blank"}
and [k-nearest neighbors](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm){:target="_blank"} (KNN).

The notebook explores the various factors that might affect a universities' graduation rate and if a model can be created
that could help university administrators predict what the graduation rate might be.

> <ins>**NOTE:**</ins>
> * This notebook is built using [R](https://www.r-project.org/ "Statistical Programming Language"){:target="_blank"} 
> instead of [Python](https://www.python.org/ "Better than R"){:target="_blank"}, see more info on how to use the notebook in the project 
> [README](https://github.com/Robert-Zacchigna/Portfolio/blob/main/Predict%20Graduation%20Rates%20(2019%20U.S.%20College%20Data)/README.md){:target="_blank"}
> * A deeper data analysis was done on this same dataset, see: 
> [Public and Private Graduation Rates Analysis (2019 U.S. College Data)]({{ site.baseurl | append: '/'}}2020/07/28/Public-and-Private-Graduation-Rates-Analysis-(2019-U.S.-College-Data).html)

{% assign part = "" %}
{% assign notebook_page = "Predict Graduation Rates (2019 U.S. College Data).html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Predict%20Graduation%20Rates%20(2019%20College%20Data)" %}

{% include view-notebook.html html=content %}


# Methodology

A series of linear regression models were created with significantly correlated variables to `Grad.Rate` and compared together 
to see which variables made the best he best model. From there, several other models were created (random forest and 
k-nearest neighbors) and compared to find the best one possible for predicting the graduation rate.


## Correlation Matrix 

A correlation matrix was created to find which variables were highly correlated with `Grad.Rate`. From the matrix below, we 
can see that the variable with the highest correlation with `Grad.Rate` is `Outstate at 0.54`and `perc.alumni` coming in 
close with `0.48`. Unfortunately, neither of these variables have a particularly good correlation with `Grad.Rate` and 
the rest of the variables fair far worse.

<div style="max-width: 900px;">
    <img style="margin: 0;" src="{{ "/assets/images/Predict Graduation Rates (2019 U.S. College Data)/Correlation Matrix.png" | prepend: site.baseurl }}" title="Correlation Matrix">
</div>


## Linear Models Comparisons

Four linear regression models were fitted with various variables from the dataset to find which combination created the 
best model, below are their formulas:

### Model 1

* Formula (all variables): 
  * `lm(formula = Grad.Rate ~ ., data = clean_data)`

### Model 2 
* Formula (significant variables from the first model): 
  * `lm(formula = Grad.Rate ~ perc.alumni + Expend + Outstate + Room.Board + Top25perc + Apps + Private + Personal + PhD + P.Undergrad)`

### Model 3

* Formula (significant variables from the second model):
  * `lm(formula = Grad.Rate ~ perc.alumni + Expend + Outstate + Room.Board + Top25perc + Apps + Private + Personal + P.Undergrad)`

### Model 4

* Formula (significant variables from the third model):
  * `lm(formula = Grad.Rate ~ perc.alumni + Expend + Outstate + Top25perc + Apps + Private)`

Below is a graph of the models R^2 and RMSE scores:

<div style="max-width: 900px;">
    <img style="margin: 0;" src="{{ "/assets/images/Predict Graduation Rates (2019 U.S. College Data)/Linear Models R^2 and RMSE.png" | prepend: site.baseurl }}" title="Linear Models R^2 and RMSE">
</div>


## Linear Analysis Plots

Analysis graphs of the models were plotted to better understand their performance with the data. The main one we want to 
look at is the `Normal Q-Q` plot in the top right corner. We want the grouping of points to be as close to the dotted 
line as possible.

> **NOTE:** The other two analysis plots can be viewed in the linked [notebook](#view-jupyter-notebook)

Below are the plots for the `1st model` and the `4th model`:


**Model 1:** All variables

<div style="max-width: 1000px;">
    <img style="margin: 0;" src="{{ "/assets/images/Predict Graduation Rates (2019 U.S. College Data)/Model 1 - Linear Analysis Plots.png" | prepend: site.baseurl }}" title="Model 1 - Linear Analysis Plots">
</div>

<p></p>

**Model 4:** `perc.alumni + Expend + Outstate + Top25perc + Apps + Private`

<div style="max-width: 1000px;">
    <img style="margin: 0;" src="{{ "/assets/images/Predict Graduation Rates (2019 U.S. College Data)/Model 4 - Linear Analysis Plots.png" | prepend: site.baseurl }}" title="Model 4 - Linear Analysis Plots">
</div>

<p></p>

From model 1 and model 4, We can see the point grouping on the Normal Q-Q plots get closer to the line, with the last 
model (model 4) having the points closest to the line. All of these graphs still have skew on right-hand tail 
but the fourth model is the best fit of them all.


## Other Models: Random Forest and K-Nearest Neighbors

For comparison, models were created using [Random Forest](https://en.wikipedia.org/wiki/Random_forest){:target="_blank"}
and [K-Nearest Neighbors](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm){:target="_blank"} (KNN) using the 
variable structure in models [1](#model-1) and [4](#model-4).

<div style="max-width: 1000px;">
    <img style="margin: 0;" src="{{ "/assets/images/Predict Graduation Rates (2019 U.S. College Data)/Model Comparisons.png" | prepend: site.baseurl }}" title="Model Comparisons.png">
</div>

<p></p>

Overall, the model with the lowest RMSE and the highest R^2 is the 1st randomforest model (clean_rf1). The randomforest 
models faired about the same (just slightly better) as the linear models and curiously, the knn models faired far worse 
than both the linear and randomForest models. However, the R^2 is still very low and the RMSE means that model is only 
able to predict the Grad Rate of a University from within about the RMSE margin. In terms of a graduation rate, that is 
quite a large margin and as a result, this should probably not be used to predict a universities' graduation rate.


# Conclusion

In conclusion, based on all of the analysis, I am confident when I say that this dataset does not have either enough data 
or the right variables measured to predict the graduation rate of these universities to a confident degree. The models 
RMSE's and R^2's are not good enough to be able to use the models for graduation rate prediction of the universities. I 
would recommend that more data be collected and other variables of measure be collected as well to get a better spread 
of data to be to get more accurate models.

I think perhaps more years of data collection is need and/or other variables to be measured for a better reflection on 
what might influence a students ability to graduate.