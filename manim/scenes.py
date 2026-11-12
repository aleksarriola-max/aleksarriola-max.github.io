"""Manim scenes for the Terminal redesign (Path A).

Two short explainers, dark Terminal palette, Text only (no LaTeX).
Render with:
    manim render -qm manim/scenes.py DcfSensitivity AltmanZ
Outputs land in media/videos/scenes/720p30/; copy the mp4s to assets/videos/.
"""

from manim import *

NIGHT = "#0D1210"
PANEL = "#17211C"
SAGE = "#92AC9B"
MIST = "#C9DACE"
PAPER = "#E5EAE4"
MUTED = "#8FA39A"
BRASS = "#B08D5A"


def dcf_ev_T(wacc_pct, g_pct):
    """Enterprise value in $T, same formula as the site's DCF heatmap.

    index.html dcf(w, g): five years of FCF starting at 109 growing 5%,
    discounted at w, plus a terminal value grown at g.
    """
    w = wacc_pct / 100.0
    g = g_pct / 100.0
    pv = 0.0
    f = 109.0
    for t in range(1, 6):
        f *= 1.05
        pv += f / (1.0 + w) ** t
    pvtv = (f * (1.0 + g) / (w - g)) / (1.0 + w) ** 5
    return (pv + pvtv) / 1000.0


class DcfSensitivity(Scene):
    def construct(self):
        self.camera.background_color = NIGHT
        title = Text("DCF sensitivity", font_size=44, color=PAPER).to_edge(UP, buff=0.55)
        sub = Text("Orcen Capital  ·  WACC 9%  ·  terminal growth 2.5%", font_size=22, color=SAGE)
        sub.next_to(title, DOWN, buff=0.18)
        self.play(FadeIn(title, shift=UP * 0.2), FadeIn(sub, shift=UP * 0.2), run_time=1.2)
        self.wait(0.5)

        waccs = [7, 8, 9, 10, 11]
        gs = [1.5, 2.0, 2.5, 3.0, 3.5]
        vals = [[dcf_ev_T(w, g) for g in gs] for w in waccs]
        lo = min(min(r) for r in vals)
        hi = max(max(r) for r in vals)
        side = 0.8
        yoff = -0.35
        cells = VGroup()
        for i, w in enumerate(waccs):
            for j, g in enumerate(gs):
                v = vals[i][j]
                t = (v - lo) / (hi - lo)
                sq = Square(side_length=side)
                sq.set_fill(SAGE, opacity=0.12 + 0.78 * t)
                sq.set_stroke(color=NIGHT, width=2)
                sq.move_to(RIGHT * (j - 2) * side + UP * (-(i - 2) * side + yoff))
                num = Text(f"{v:.1f}", font_size=20, color=PAPER).move_to(sq.get_center())
                cells.add(VGroup(sq, num))
        rows = VGroup(*[
            Text(f"{w}%", font_size=18, color=MUTED).move_to(
                LEFT * 2.45 + UP * (-(i - 2) * side + yoff))
            for i, w in enumerate(waccs)
        ])
        cols = VGroup(*[
            Text(f"{g}%", font_size=18, color=MUTED).move_to(
                RIGHT * (j - 2) * side + UP * 1.95)
            for j, g in enumerate(gs)
        ])
        self.play(FadeIn(cells, shift=UP * 0.15), FadeIn(rows), FadeIn(cols), run_time=1.8)
        self.wait(0.4)

        stops = [(9, 2.5), (11, 1.5), (7, 3.5)]
        cap = None
        hl = Rectangle(width=side + 0.16, height=side + 0.16)
        hl.set_stroke(color=PAPER, width=3)
        hl.set_fill(opacity=0)
        first = True
        for w, g in stops:
            i = waccs.index(w)
            j = gs.index(g)
            v = vals[i][j]
            target = RIGHT * (j - 2) * side + UP * (-(i - 2) * side + yoff)
            new_cap = Text(f"WACC {w}%  ·  g {g}%  →  EV ${v:.1f}T", font_size=24, color=PAPER)
            new_cap.to_edge(DOWN, buff=0.5)
            if first:
                hl.move_to(target)
                self.play(Create(hl), FadeIn(new_cap), run_time=1.0)
                cap = new_cap
                first = False
            else:
                self.play(hl.animate.move_to(target), FadeOut(cap), FadeIn(new_cap), run_time=1.1)
            cap = new_cap
            self.wait(0.7)
        closing = Text("Small moves in WACC move the value most.", font_size=23, color=SAGE)
        closing.to_edge(DOWN, buff=0.5)
        self.play(FadeOut(cap), FadeIn(closing), run_time=0.9)
        self.wait(1.4)


class AltmanZ(Scene):
    def construct(self):
        self.camera.background_color = NIGHT
        title = Text("Altman Z-score", font_size=44, color=PAPER).to_edge(UP, buff=0.55)
        sub = Text("Five ratios, one distress signal", font_size=22, color=SAGE)
        sub.next_to(title, DOWN, buff=0.18)
        self.play(FadeIn(title, shift=UP * 0.2), FadeIn(sub, shift=UP * 0.2), run_time=1.2)
        formula = Text("Z = 1.2 X1 + 1.4 X2 + 3.3 X3 + 0.6 X4 + 1.0 X5", font_size=26, color=MIST)
        formula.next_to(sub, DOWN, buff=0.45)
        self.play(FadeIn(formula, shift=UP * 0.15), run_time=1.0)
        self.wait(0.4)

        names = ["X1  working capital / assets", "X2  retained earnings / assets",
                 "X3  EBIT / assets", "X4  equity / liabilities", "X5  sales / assets"]
        vals = [0.12, 0.08, 0.10, 0.80, 0.90]
        weights = [1.2, 1.4, 3.3, 0.6, 1.0]
        contribs = [w * v for w, v in zip(weights, vals)]
        rows = VGroup()
        for k in range(5):
            y = 1.15 - k * 0.62
            name = Text(names[k], font_size=18, color=PAPER)
            name.move_to(LEFT * 5.4 + UP * y, aligned_edge=LEFT)
            bar = Rectangle(width=max(0.15, contribs[k] * 4.6), height=0.34)
            bar.set_fill(SAGE, opacity=0.85)
            bar.set_stroke(width=0)
            bar.move_to(LEFT * 0.6 + UP * y, aligned_edge=LEFT)
            val = Text(f"{contribs[k]:.2f}", font_size=18, color=MIST)
            val.next_to(bar, RIGHT, buff=0.15)
            rows.add(VGroup(name, bar, val))
        self.play(LaggedStart(*[GrowFromEdge(r[1], LEFT) for r in rows],
                                FadeIn(VGroup(*[r[0] for r in rows])),
                                FadeIn(VGroup(*[r[2] for r in rows])), lag_ratio=0.25), run_time=2.2)
        self.wait(0.5)

        z_lo, z_hi = 0.0, 4.0
        gx0, gx1, gy = -5.2, 2.2, -2.35
        def zx(z):
            return gx0 + (z - z_lo) / (z_hi - z_lo) * (gx1 - gx0)
        zones = [(0.0, 1.81, BRASS, "distress < 1.81"),
                 (1.81, 2.99, MIST, "grey  1.81 – 2.99"),
                 (2.99, 4.0, SAGE, "safe > 2.99")]
        gauge = VGroup()
        for a, b, col, lab in zones:
            rect = Rectangle(width=zx(b) - zx(a), height=0.42)
            rect.set_fill(col, opacity=0.85)
            rect.set_stroke(width=0)
            rect.move_to(RIGHT * (zx(a) + zx(b)) / 2 + UP * gy)
            tag = Text(lab, font_size=16, color=MUTED)
            tag.next_to(rect, DOWN, buff=0.12)
            gauge.add(VGroup(rect, tag))
        self.play(FadeIn(gauge, shift=UP * 0.15), run_time=1.0)
        z_val = 1.97
        marker = Triangle(color=PAPER, fill_opacity=1).scale(0.16)
        marker.move_to(RIGHT * zx(0.0) + UP * (gy + 0.55))
        zlab = Text(f"Z = {z_val:.2f}", font_size=22, color=PAPER)
        zlab.next_to(marker, UP, buff=0.15)
        self.play(FadeIn(marker), FadeIn(zlab), run_time=0.6)
        self.play(marker.animate.move_to(RIGHT * zx(z_val) + UP * (gy + 0.55)),
                  zlab.animate.move_to(
                      RIGHT * zx(z_val) + UP * (gy + 0.55) + UP * 0.45), run_time=1.4)
        cap = Text("Z = 1.97  ·  grey zone — watch it.", font_size=23, color=SAGE)
        cap.to_edge(DOWN, buff=0.45)
        self.play(FadeIn(cap, shift=UP * 0.15), run_time=0.8)
        self.wait(1.4)
