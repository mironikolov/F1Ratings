using Microsoft.EntityFrameworkCore.Migrations;

namespace F1Ratings.Migrations
{
    public partial class RaceTableFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Year",
                table: "Races",
                newName: "Date");

            migrationBuilder.AddColumn<int>(
                name: "TrackId",
                table: "Races",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Races_TrackId",
                table: "Races",
                column: "TrackId");

            migrationBuilder.AddForeignKey(
                name: "FK_Races_Tracks_TrackId",
                table: "Races",
                column: "TrackId",
                principalTable: "Tracks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Races_Tracks_TrackId",
                table: "Races");

            migrationBuilder.DropIndex(
                name: "IX_Races_TrackId",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "TrackId",
                table: "Races");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Races",
                newName: "Year");
        }
    }
}
