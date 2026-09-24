"""House-style matplotlib helpers for answer sketches (AUTHORING_GUIDE §7): black axes with
arrowheads at the positive ends only, labels at the arrow tips, light-grey grid behind, exact
axis limits. `save()` writes straight into the question folder.

For a sketch on VCAA's blank grid, call `axes(...)`, then `ax.grid(False)` and draw the
printed gridlines with `ax.vlines(...)` / `ax.hlines(...)` over exactly the region VCAA's grid
covers."""
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'tools', 'worked-solutions', 'questions')
CURVE = '#0ea5e9'
SECOND = '#f97316'
RED = '#ef4444'


def axes(xlim, ylim, xstep=1, ystep=1, size=(5.0, 4.6), xlabel='x', ylabel='y', skip_zero=True, xgrid=None, ygrid=None):
    fig, ax = plt.subplots(figsize=size)
    ax.set_xlim(*xlim)
    ax.set_ylim(*ylim)
    ax.set_xticks([t for t in np.arange(xlim[0], xlim[1] + 1e-9, xstep) if not (skip_zero and abs(t) < 1e-9)])
    ax.set_yticks([t for t in np.arange(ylim[0], ylim[1] + 1e-9, ystep) if not (skip_zero and abs(t) < 1e-9)])
    if xgrid or ygrid:
        from matplotlib.ticker import MultipleLocator
        ax.xaxis.set_minor_locator(MultipleLocator(xgrid or xstep))
        ax.yaxis.set_minor_locator(MultipleLocator(ygrid or ystep))
        ax.tick_params(which='minor', length=0)
        ax.grid(True, which='both', color='#d9d9d9', linewidth=0.7, zorder=0)
    else:
        ax.grid(True, color='#d9d9d9', linewidth=0.7, zorder=0)
    ax.set_axisbelow(True)
    for s in ('top', 'right', 'bottom', 'left'):
        ax.spines[s].set_visible(False)
    ax.annotate('', xy=(xlim[1], 0), xytext=(xlim[0], 0),
                arrowprops=dict(arrowstyle='-|>', color='black', linewidth=1.2),
                annotation_clip=False, zorder=3)
    ax.annotate('', xy=(0, ylim[1]), xytext=(0, ylim[0]),
                arrowprops=dict(arrowstyle='-|>', color='black', linewidth=1.2),
                annotation_clip=False, zorder=3)
    ax.annotate(xlabel, xy=(xlim[1], 0), xytext=(7, -3), textcoords='offset points',
                ha='left', va='top', fontsize=11, annotation_clip=False)
    ax.annotate(ylabel, xy=(0, ylim[1]), xytext=(5, 4), textcoords='offset points',
                ha='left', va='bottom', fontsize=11, annotation_clip=False)
    ax.tick_params(labelsize=9, length=0)
    return fig, ax


def point(ax, x, y, label, dx=6, dy=6, ha='left', color='black'):
    ax.plot([x], [y], 'o', color=color, markersize=4.5, zorder=6)
    if label:
        ax.annotate(label, xy=(x, y), xytext=(dx, dy), textcoords='offset points', ha=ha,
                    fontsize=10, zorder=7,
                    bbox=dict(boxstyle='round,pad=0.1', fc='white', ec='none', alpha=0.8))


def save(fig, name):
    path = os.path.join(OUT, name)
    fig.savefig(path, dpi=200, transparent=True, bbox_inches='tight')
    plt.close(fig)
    print('saved', name)
