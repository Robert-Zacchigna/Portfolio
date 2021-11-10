---
layout: post
title: Public and Private Graduation Rates Analysis (2019 U.S. College Data)
tags: Jupyter Notebook, Python, Pandas, College/University, ThinkStats2
category: Statistical Analysis, Data Analysis, Regression
summary: Explores the relationship between public and private universities' graduation rates to see if a university being 
         Private or Public has an effect on its graduation rate and what factors specifically affect those rates.
---

# Overview

This statistical analysis dives deep into what factors contribute to a college/universities graduation rate, specifically 
taking a look at if a university being **public** or **private** has any significant effect on it. Statical and Regression 
analysis is conducted on the variables in the dataset to get a deeper understanding of how they effect the `graduation rate`.

<ins>This analysis has two parts:</ins>
* [Part 1 - Exploratory Data Analysis (EDA)](#part-1---exploratory-data-analysis-eda)
* [Part 2 - Regression Analysis](#part-2---regression-analysis)

The notebook takes a look at if a college/university being **public** or **private** has 
an effect on its `graduation rate` and what other factors might contribute to it.

> **NOTE:** A machine learning analysis was done on this same dataset, see: 
> [Predict Graduation Rates (2019 U.S. College Data)]({{ site.baseurl | append: '/'}}2020/06/11/Predict-Graduation-Rates-(2019-U.S.-College-Data).html)

{% assign part = "" %}
{% assign notebook_page = "Public and Private Graduation Rates Analysis (2019 U.S. College Data).html" %}
{% assign github_notebook = "https://github.com/Robert-Zacchigna/Portfolio/tree/main/Public%20and%20Private%20Graduation%20Rates%20Analysis%20(2019%20College%20Data)" %}

{% include view-notebook.html html=content %}


# Question

Does a University being Private or Public have an effect on its graduation rate and what factors specifically affect those rates?


# Hypothesis

Private universities might have a higher graduation rate than public universities and that the biggest factors for the 
graduation rate will be: the number of students enrolled, the amount of faculty with PhD’s and economic factors of the 
university (variables: Room.Board, Books, Personal and Expend).



# Part 1 - Exploratory Data Analysis (EDA)

The following are several graphs were created to get a better idea of the overall structure and distribution of the data
in the dataset. This helps to see anything that might need to be accounted for or changed before starting analysis and modeling. 

Here is a sample of what the data looks like:

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/College Data Sample.png" | prepend: site.baseurl }}" title="College Data Sample">


## Variable Histograms

Histograms of the numerical variables to see their overall distributions in the dataset:

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/Variable Histograms.png" | prepend: site.baseurl }}" title="Variable Histograms">


## Outliers

```text
University Name: Texas A&M University at Galveston
Percentage of Faculty with PhD's: 103%

University Name: Cazenovia College
Graduation Rate: 118%
```

`Texas A&M University at Galveston` lists a **faculty PhD** percentage of `103%` which, in the context of the variable measured, 
is impossible because the variable is measuring the number of faculty with at least one PhD and thus if a person has 
multiple PhD’s they will only be counted as one.

`Cazenovia College` lists a **graduation rate** of `118%` which is also impossible because you can't have more students
graduated than the number of students in the graduating class.

For the above reasons, these two data points will be removed from the dataset as they are more than likely a data collection error.


## CDF - Public and Private Graduation Rates (Percent)

CDF visual of the **public** and **private** university `graduation rates`:

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/CDF of Graduation Rates.png" | prepend: site.baseurl }}" title="CDF of Graduation Rates">

From the above graph we can see that **public** universities consistently have a `higher graduation rate` than **private** 
ones. This tells me that my initial hypothesis that private universities would have a higher graduation rate is *not* correct.

More investigation will be needed to find which variables are significantly contributing the difference in grad rate 
between public and private universities.


## PMF - Public and Private Uni's Percent of Faculty with PhD's

I decided to take a look and see if **public** or **private** universities have a higher percentage of faculty with `PhD's`:

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/Public and Private PhD PMF.png" | prepend: site.baseurl }}" title="PMF - Public and Private PhD Percentage">

Judging from the graph above, it would appear that **public** universities have a `higher percentage of faculty with PhD's` 
compared to **private** universities.


## Normal Probability Plots

From the Normal Probability Plots below, we can see that the distribution of all university graduation rates is approximately 
normal with a slight tail on the left side. Public and Private graduation rate plots makes it clear that their distributions 
also follow normality but with more pronounced tails on both ends. The graphs also show that the distribution of all the 
graduation rates (**public** and **private**) is approximately normal and that there isn’t significant skewness to the 
data that could disproportionally sway the analysis.

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/Normal Probability Plot of Graduation Rates.png" | prepend: site.baseurl }}" title="Normal Probability Plots of Graduation Rates">


## Public and Private Acceptance vs. New Enrollment

Scatter plots of **public** and **private** `acceptance numbers` vs `enrollment numbers`:

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/Scatter Plots - Accept vs. Enroll (Public and Private).png" | prepend: site.baseurl }}" title="Scatter Plots - Accept vs. Enroll (Public and Private)">


## Correlation Matrix

<style>
    .language-text {
        max-width: 515px !important;
    }
</style>

```text
|==============================|
|	Accept vs. Enroll      |
|==========|=========|=========|
|	   | Public  | Private |
|----------|---------|---------|
|  Pearson | 0.87919 | 0.90649 |
|----------|---------|---------|
| Spearman | 0.93174 | 0.92828 |
|==========|=========|=========|
```

From the two scatter plots and correlation matrix above (detailing both [Pearson](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient){:target="_blank"}
and [Spearman](https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient){:target="_blank"} correlation), 
we can see that the number of accepted and enrolled students in both **public** (`Pearson: 0.879`) and **private** 
(`Pearson: 0.906`) universities is positively strongly correlated and even more so when comparing Spearman's correlation 
(`Public: 0.932` and `Private: 0.928`)to Pearson's.

This indicates that the number of students accepted and enrolled is linearly related and that as the number of students 
accepted into the university increases, then the number of new student enrollments will also increase a proportional amount.


## Hypothesis Tests

Hypothesis tests were conducted to see if any significant relationships could be derived and/or if the 
[Null Hypothesis](https://www.statisticshowto.com/probability-and-statistics/null-hypothesis/){:target="_blank"} could 
be rejected or not.

### Difference in Means

```text
Difference in Means: 0.0 (P-value)
```

The [Difference in Means](https://www.statisticshowto.com/mean-difference/){:target="_blank"} test resulted in a p-value 
of zero (odds are It's not exactly zero but very small). Since the p-value is smaller than `0.05`, the null hypothesis 
can be rejected.


### Difference in Standard Deviations

```text
Difference in Standard Deviations: 0.99 (P-value)
```

The [Difference in Standard Deviations](https://www.mathsisfun.com/data/standard-deviation-formulas.html){:target="_blank"}
test resulted in a p-value of `0.99`. Since this p-value way greater than `0.05`, the null hypothesis cannot be rejected. 
However, since the **private** dataset (564) has quite a few more values than the **public** dataset(211), the private 
standard deviation will be much larger and thus skewing the results.


### Chi-Squares

```text
Chi-Squares:
 * P-value:  0.002
 *  Actual: 27.46185
 *  Ts Max: 32.67935
```

The [Chi-Squares](https://www.statisticshowto.com/probability-and-statistics/chi-square/){:target="_blank"} test resulted 
in a p-value of `0.002` and is much lower than `0.05` (as a result we can reject the null hypothesis).


### False Negative Rate

```text
False Negative Rate: 0.0
```

The [False Negative Rate](https://en.wikipedia.org/wiki/False_positives_and_false_negatives){:target="_blank"} resulted 
in a value of `0.0` (odds are It's not exactly zero but very small). Which is a good thing because that means that the 
power of this test has high statistical significance.


# Part 2 - Regression Analysis

Regression analysis was conducted to see the deeper relationships between the variables, specifically with the 
graduation rate (`grad.rate`).

## Least Squares - Graduation Rate vs. New Student Enrollments

I graphed the [Least Squares](https://www.statisticshowto.com/probability-and-statistics/statistics-definitions/least-squares-regression-line/){:target="_blank"} 
fit to see what the type of relationship my variables have, specifically if they are linearly related or not.

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/Least Squares Best Fit - Graduation Rates vs. New Student Enrollments.png" | prepend: site.baseurl }}" title="Least Squares Best Fit - Graduation Rates vs. New Student Enrollments">


## Residuals (Percentile Ranks) - Graduation Rate vs. New Student Enrollments

This is to see if the relationship between `Grad.Rate` and `Enroll` is linear by plotting a CDF of the percentiles.

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/CDF Percentile Ranks - Graduation Rate vs. New Student Enrollments.png" | prepend: site.baseurl }}" title="CDF Percentile Ranks - Graduation Rate vs. New Student Enrollments">

The above graph shows the 25th, 50th, and 75th percentiles of the Least Squares residuals.

Since the percentile lines are angled (or otherwise curved) in the residuals, this suggests that there is a non-linear 
relationship between `Graduation Rate` and `Enrollments`.


## Showing Uncertainty - Confidence Intervals for Fitted Values of Graduation Rate

The graph below shows the confidence interval for the fitted values at each `Graduation Rate`:

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/Confidence Intervals for Fitted Values of Graduation Rate.png" | prepend: site.baseurl }}" title="Confidence Intervals for Fitted Values of Graduation Rate">


## Slope Hypothesis Test - Grad Rate and New Student Enrollments

This next test is to see whether the observed slope is statistically significant (`Grad.Rate` and `Enroll`):

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/Slope Hypothesis Test - Grad Rate and New Student Enrollments.png" | prepend: site.baseurl }}" title="Slope Hypothesis Test - Grad.Rate and New Student Enrollments">

<p></p>

From the above graph, we can see that the slopes have pretty much the same shape with the only difference being their means. 
[Null Hypothesis](https://www.statisticshowto.com/probability-and-statistics/null-hypothesis/){:target="_blank"} is at `0` 
and the observed slope is at around `-1`.

The P-value of the sampled slope (`0.775`) indicates that this is not at all statistically significant, which further lends 
credence to the `Enroll` variable not having a strong relationship the `graduation rates` of the universities.


## Multiple Regression

Next, I did some multiple regression of my variables using `Grad.Rate` as the dependent variable.


### All Variables

The below output is a model using of all variables (from the entirety of my dataset) with `Grad.Rate` as the dependent 
variable. In order to make a better model, I need to first take a look at which of my variables are statistically 
significant for trying to explain the dependent variable (`Grad.Rate`).

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/Multiple Regression - All Variables.PNG" | prepend: site.baseurl }}" title="Multiple Regression - All Variables">

To find which variables are significant, we are looking for p-values of `0.05` or less and I can find those values under the 
**P>|t|** column. From there I can see that the variables `Enroll (0.828)`, `Books (0.429)`, and `Expend (0.261)` all have p-values 
larger than 0.05 (thus not statistically significant to this model) and should be removed.


### Only Statistically Significant Variables

Rerun the regression model with all variables that have p-value greater than `0.05`, removed: `Enroll`, `Books`, and `Expend`.

<img style="margin: 0;" src="{{ "/assets/images/Public and Private Graduation Rates Analysis (2019 U.S. College Data)/Multiple Regression - Only Statistically Significant Variables.PNG" | prepend: site.baseurl }}" title="Multiple Regression - Only Statistically Significant Variables">

Looking under the **P>|t|** column again in the above output, I can see that there are no longer any variables in this 
model that have a p-value greater than `0.05` and thus they are statistically significant to explaining `Grad.Rate`.


# Conclusion

From my [question](#question) and [hypothesis](#hypothesis), my conclusion based on this data and my analysis is that public 
universities actually have a higher graduation rate than private universities.

Furthermore, the number of new student enrollments have a statistically insignificant effect on the grad rate and the 
variables that have significant effects are: the number of new student applications (`Apps`), number of new students accepted 
(`Accept`), cost of room and board (Room.Board), the amount of personal expenses for the student (`Personal`), and the 
percentage of faculty with PhD's (`PhD`).

This also means that my hypothesis was only partially correct about the economic factors being the main variables that 
effect the grad rate, with the cost of books (`Books`) and expenditure (`Expend`) not having a significant effect.
